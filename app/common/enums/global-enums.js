/* Available Server types */
module.exports.ServerType = {
    PANEL: "panel",
    PLATFORM: "platform",
    ADMIN: "admin",
    INTERNAL: "internal",
    WEBHOOK: "webhook",
};

/* Available app modes */
module.exports.AppMode = {
    CONSUMER: "consumer",
    SERVER: "server",
};

/* Available environments */
module.exports.Env = {
    DEVELOPMENT: "development",
    BOLTICX0: "bolticx0",
    BOLTICX1: "bolticx1",
    BOLTICX2: "bolticx2",
    BOLTICZ0: "bolticz0",
    BOLTICZ1: "bolticz1",
    CI: "ci",
    PRODUCTION: "production",
};

/* Available app environments */
module.exports.AppEnv = {
    PRODUCTION: "production",
    DEVELOPMENT: "development",
    PRE_PRODUCTION: "pre-production",
    TEST: "test",
    BOLTICX2: "bolticx2",
};

module.exports.ConsumerTypes = {
   SCHEDULE_TRIGGERS :"ScheduleTriggers",
   ENTITY_JOB_SCHEDULER_HANDLER: "EntityJobSchedulerHandler"
}

module.exports.EntityJobEvent = {
    DELETE: "DELETE",
    UPDATE: "UPDATE"
}

module.exports.Timezones={
    ISO_STD:"en-US",
    IST:"Asia/Kolkata"
}
