const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../model/user");

exports.user_login = function (req, res) {
    return new Promise(async (resolve, reject) => {
        if (!req.body.email || !req.body.password) {
            res.sendStatus(400);
            reject("Bad Request!");
        } else {
            try {
                const user = await users
                    .findOne({ email: req.body.email })
                    .exec();
                if (!user) {
                    res.status(404).send("User not found! Please Sign Up");
                    reject("User not found!");
                } else {
                    const result = await bcrypt.compare(
                        req.body.password,
                        user.password
                    );
                    if (result) {
                        const access_token = jwt.sign(
                            {
                                UserInfo: {
                                    email: user.email,
                                    role: user.role,
                                },
                            },
                            process.env.ACCESS_TOKEN_SECRET,
                            { expiresIn: "30m" }
                        );
                        const refresh_token = jwt.sign(
                            { email: user.email },
                            process.env.REFRESH_TOKEN_SECRET,
                            { expiresIn: "1d" }
                        );
                        const response = {
                            access_token,
                            refresh_token,
                            user,
                        };
                        res.setHeader("Content-Type", "application/json");
                        res.status(200).send(response);
                        resolve(response);
                    } else {
                        res.status(403).send("Invalid Password!");
                        reject("Invalid Password!");
                    }
                }
            } catch (err) {
                console.error(err);
                res.sendStatus(500);
                reject(err);
            }
        }
    });
};

exports.register_user = async function (req, res) {
    return new Promise(async (resolve, reject) => {
        var { firstname, lastname, email, password, gender, dob } = req.body;
        if (!firstname || !lastname || !email || !password || !gender || !dob) {
            res.sendStatus(400);
            reject("Bad Request!");
        } else {
            try {
                const result = await bcrypt.hash(password, 10);
                if (result) {
                    req.body.password = result;
                }
                const user = new users(req.body);
                await user.save();
                res.status(201).send("user registered successfully");
                resolve("user registered successfully");
            } catch (err) {
                console.error(err);
                res.sendStatus(500);
                reject(err);
            }
        }
    });
};

exports.get_users = function (req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            const usersData = await users.find({}).exec();
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(usersData);
            resolve(usersData);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
            reject(err);
        }
    });
};

exports.get_user_by_id = function (req, res) {
    return new Promise(async (resolve, reject) => {
        if (!req.params.id) {
            res.sendStatus(400);
            reject("Bad Request!");
        } else {
            try {
                const user = await users
                    .findOne({ email: req.params.id })
                    .exec();
                if (!user) {
                    res.status(404).send("User not found!");
                    reject("User not found!");
                } else {
                    res.setHeader("Content-Type", "application/json");
                    res.status(200).send(user);
                    resolve(user);
                }
            } catch (err) {
                console.log(err);
                res.sendStatus(500);
                reject(err);
            }
        }
    });
};

exports.update_user_by_id = async function (req, res) {
    return new Promise(async (resolve, reject) => {
        if (!req.params.id) {
            res.sendStatus(400);
            reject("Bad Request!");
        } else {
            var allowed_keys = [
                "firstname",
                "lastname",
                "password",
                "gender",
                "dob",
            ];
            flag = true;
            for (let key of Object.keys(req.body)) {
                if (!allowed_keys.includes(key)) {
                    flag = false;
                    break;
                }
            }
            if (!flag) {
                res.sendStatus(400);
                reject("Bad Request!");
            } else {
                try {
                    if (req.body.password) {
                        const result = await bcrypt.hash(req.body.password, 10);
                        if (result) {
                            req.body.password = result;
                        }
                    }
                    await users.updateOne(
                        { email: req.params.id },
                        { $set: req.body }
                    );
                    res.status(200).send("User record updated successfully!");
                    resolve("User record updated successfully!");
                } catch (err) {
                    console.log(err);
                    res.sendStatus(500);
                    reject(err);
                }
            }
        }
    });
};

exports.delete_user_by_id = function (req, res) {
    return new Promise(async (resolve, reject) => {
        if (!req.params.id) {
            res.sendStatus(400);
            reject("Bad Request");
        } else {
            try {
                const user = await users.findOneAndDelete({
                    email: req.params.id,
                });
                if (user) {
                    res.status(200).send("User deleted successfully!");
                    resolve("User deleted successfully!");
                } else {
                    res.status(404).send("User not found!");
                    reject("User not found!");
                }
            } catch (err) {
                console.log(err);
                res.sendStatus(500);
                reject(err);
            }
        }
    });
};
