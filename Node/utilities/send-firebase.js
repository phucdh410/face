const moment = require("moment");
const ffmpeg = require('fluent-ffmpeg');
const formidable = require('formidable');
const _ = require('underscore');
const fs = require('fs');
const async = require('async');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

var admin = require("firebase-admin");
var serviceAccount = require("../config/icoolbusiness-firebase-adminsdk-kk2v3-80f6d84e3c.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://icoolbusiness.firebaseio.com"
});

const config = require('../config/common')

const { add_notification_error_log } = require("../logs/web/admin/add-notification");

const validateAddNotificationInput = require("../validation/web/admin/add-notification");

// Load User model
const User = require("../models/User");
var user = new User();

// Load Notification model
const Notification = require("../models/Notification");
var notification = new Notification();

// Load Document model
const Document = require("../models/Document");
var document = new Document();

// Load File model
const File = require("../models/File");
var file = new File();

exports.uploadFileAndCreateNotification = function (req, res, cb) {
    var document_id = uuidv4();

    async.waterfall([
        // Upload files to server
        function (callback) {
            var data = {}

            var current = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
            console.log("-------------------------------------------");
            console.log("POST - /admin/notification/add");
            console.log("time: " + current);

            var yy = new Date().getFullYear()
            var mm = new Date().getMonth() + 1
            if (mm < 10) {
                mm = '0' + mm;
            }

            var dd = new Date().getDate()
            if (dd < 10) {
                dd = '0' + dd
            }

            ffmpeg.setFfmpegPath(config.ffmpegPath);
            ffmpeg.setFfprobePath(config.ffprobePath);

            var form = new formidable.IncomingForm();
            form.maxFileSize = 20971520;
            form.multiples = true;
            form.uploadDir = config.tempfilePath;
            form.keepExtensions = true;

            var fields = [],
                files = [],
                fileNames = [],
                paths = [];

            form.on('aborted', function () {
                console.log('The request was aborted by the user');
            });

            form.on('error', function (err) {
                callback({
                    status: false,
                    error_code: 1005,
                    errors: err.message
                }, null);
            });

            form.on('field', function (field, value) {
                fields[field] = value;
                data.category_id = fields.category_id;
                data.content = fields.content;
            });

            //Call back when each file in the form is parsed.
            form.on('file', function (name, file) {
                if (file.size > 0) {
                    const filename = file.name;
                    console.log('filename: ', filename);
                    files[filename] = file;
                    fileNames.push(filename);
                    paths.push(file.path);
                }
            });

            //Call back at the end of the form.
            form.on('end', function () {
                var oldpath = paths;
                var dir = config.filePath;

                async.waterfall([
                    function (callback) {
                        // Resize images
                        if (!fs.existsSync(dir + yy)) {
                            fs.mkdirSync(dir + yy);
                        }

                        if (!fs.existsSync(dir + yy + "/" + mm)) {
                            fs.mkdirSync(dir + yy + "/" + mm);
                        }

                        if (!fs.existsSync(dir + yy + "/" + mm + "/" + dd)) {
                            fs.mkdirSync(dir + yy + "/" + mm + "/" + dd);
                        }

                        callback(null, dir + yy + "/" + mm + "/" + dd)
                    },
                    function (dir, callback) {
                        var filefail = [];

                        _.each(fileNames, (item, id, list) => {
                            if (_.indexOf(config.extnameFile, path.extname(list[id])) == -1) {
                                filefail.push(item);
                            }
                        });

                        if (filefail.length > 0) {
                            console.log('extension: ', fileNames);
                            callback({
                                status: false,
                                error_code: 1006,
                                errors: "Vui lòng chọn lại file"
                            }, null);
                        } else {
                            if (fileNames.length > 0) {
                                var paths = [];

                                _.each(fileNames, (item, id, list) => {
                                    var filename = dir + '/' + list[id];
                                    paths.push(filename);

                                    fs.rename(oldpath[id].toString(), filename, function (err, result) {
                                        if (err) {
                                            console.log('Error: ', err.message);
                                        }
                                    });
                                });

                                var file_ids = [];

                                var values = _.map(fileNames, (item, idx, list) => {
                                    var file_id = uuidv4();
                                    file_ids.push(file_id);
                                    var last = "." + _.last(item.split('.'))
                                    return '(' + "'" + file_id + "'" + ","
                                        + "N'" + path.basename(item, last) + "'" + ","
                                        + "N'" + "/upload" + paths[idx].split('/upload')[1] + "'" + ","
                                        + "'" + path.extname(list[idx]) + "'" + ","
                                        + "'" + req.user._id + "'" + ","
                                        + "'" + moment(Date.now()).format("YYYY-MM-DD") + "'"
                                        + ')'
                                });

                                file.create(values)
                                    .then(data => {
                                        callback(null, file_ids);
                                    })
                                    .catch(err => {
                                        console.log('Error: ', err.message);

                                        callback({
                                            status: false,
                                            error_code: 1007,
                                            errors: err.message
                                        }, null);
                                    });
                            } else {
                                callback(null, null);
                            }
                        }
                    }
                ], function (err, result) {
                    // Add photo info to database
                    if (err) {
                        callback(err, [data]);
                    } else {
                        callback(null, [data, result]);
                    }
                });
            });

            form.parse(req);
        },
        // Get firebase tokens & users
        function (resultFile, callback) {
            user.getFcmToken()
                .then(users => {
                    console.log(users.length)
                    var tokens = [];

                    _.each(users, (item) => {
                        if (item.firebase != null || item.firebase != undefined) {
                            tokens.push({
                                token: item.firebase,
                                id: item.id
                            });
                        }
                    });
                    var tokenList = []
                    var strToken = Math.ceil(tokens.length / 10)

                    for (x = 0; x < strToken; x++) {
                        tokenList.push(tokens.slice(x * 10, x * 10 + 10))
                    }

                    var userList = []
                    var strUser = Math.ceil(users.length / 200)

                    for (x = 0; x < strUser; x++) {
                        userList.push(users.slice(x * 200, x * 200 + 200))
                    }

                    callback(null, resultFile, tokenList, userList);
                })
                .catch(err => {
                    console.log('Error: ', err.message);

                    callback({
                        status: false,
                        error_code: 1007,
                        errors: err.message
                    }, null);
                });
        },
        // Insert into the Documents table
        function (resultFile, tokens, users, callback) {
            const { category_id, content } = resultFile[0];
            const { errors, is_valid } = validateAddNotificationInput(resultFile[0]);

            var current = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
            console.log("-------------------------------------------");
            console.log("POST - /admin/notification/add");
            console.log("category_id: " + category_id);
            console.log("content: " + content);
            console.log("time: " + current);

            // Check validation
            if (!is_valid) {
                errors.status = false;
                add_notification_error_log(JSON.stringify(errors));
                callback(errors, null);
            } else {
                document.add(document_id, category_id, content, req.user._id,
                    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), req.user.code)
                    .then(data => {
                        var result = [];
                        result.push(document_id);
                        callback(null, [resultFile, tokens, users, result]);
                    })
                    .catch(err => {
                        console.log('Error: ', err.message);

                        callback({
                            status: false,
                            error_code: 1007,
                            errors: err.message
                        }, null);
                    });
            }
        }
    ], (err, result) => {
        if (err) {
            cb(err, null);
        } else {
            var io = req.app.io;

            io.emit("Notification", JSON.stringify({
                status: true,
                payload: {
                    notificationId: document_id,
                    content: result[0].content,
                },
                error_code: 0,
                errors: ""
            }));

            cb(null, result);
        }
    })
}

exports.pushNotification = function (req, resultFile, tokens, users, resultNotification, cb) {
    async.parallel([
        // Push notification using firebase
        function (callback) {
            var str = [];

            _.each(resultFile[0].content, (ite, idx, list) => {
                if (list[idx] == " " && idx > config.titleLength) {
                    str.push(idx);
                }
            });

            var title = resultFile[0].content.slice(0, _.first(str));
            title = config.removehtml(title)
            title = entities.decode(title)

            var receiverToken = []

            _.each(tokens, (item, idx, list) => {
                list[idx] = _.reject(item, (ite) => {
                    return ite.token == "";
                });
            })

            _.each(tokens, (item) => {
                console.log(item)
                _.each(item, (ite) => {
                    receiverToken.push(ite.token);
                });
                console.log(receiverToken)
                var message = {
                    notification: {
                        title: 'ICOOL Thông Báo',
                        body: title
                    },
                    data: {
                        notiId: resultNotification[0]
                    },
                    tokens: receiverToken
                };
                receiverToken = []
                admin.messaging().sendMulticast(message)
                    .then((response) => {
                        // Response is a message ID string.
                        console.log('Successfully sent message:', response);
                    })
                    .catch((err) => {
                        console.log('Error: ', err.message);
                    });
            })
            callback(null, null)
        },
        // Insert into the NotificationReceiver table
        function (callback) {
            console.log(users)
            _.each(users, (item) => {
                var str = [];
                str.push(item);

                var values = _.map(str[0], (ite) => {
                    return '(' + "'" + resultNotification[0] + "'" + ","
                        + "'" + ite.id + "'" + ","
                        + "'" + req.user.code + "'" + ","
                        + "'" + moment(Date.now()).format("YYYY-MM-DD") + "'"
                        + ')'
                });

                notification.add(values)
                    .then(data => {
                        console.log(data)
                    })
                    .catch(err => {
                        console.log('Error: ', err.message);
                    });
                str = []
            })
            callback(null, null)
        },

        // Insert into the NotificationFile table
        function (callback) {
            if (resultFile[1] == undefined || resultFile[1].length == 0) {
                callback(null, null);
            } else {
                var values = _.map(resultFile[1], (item) => {
                    return '(' + "'" + resultNotification[0] + "'" + ","
                        + "'" + item + "'" + ","
                        + "'" + req.user.code + "'" + ","
                        + "'" + moment(Date.now()).format("YYYY-MM-DD") + "'"
                        + ')'
                });

                file.add(values)
                    .then(data => {
                        callback(null, data);
                    })
                    .catch(err => {
                        console.log('Error: ', err.message);

                        callback({
                            status: false,
                            error_code: 1007,
                            errors: err.message
                        }, null);
                    });
            }
        }
    ], (err, results) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, [resultFile, resultNotification]);
        }
    });
}