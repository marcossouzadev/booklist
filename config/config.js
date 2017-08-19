'use strict'
export default {
  database:'booList',
  username:'',
  password:'',
  params:{
    dialect:'sqlite',
    storage:'bookList.sqlite',
    define:{
      underscored:true,
    }
  },
  jwtSecret:"bk3api1",
  jwtSession: {session:false},
}
