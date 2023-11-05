const {
  connect_db,
  close_db,
  clear_data,
  load_data,
} = require("./test-db-helper");

before(async ()=>{
    await connect_db();
})

after(async ()=>{
    await clear_data();
    await close_db();
})
