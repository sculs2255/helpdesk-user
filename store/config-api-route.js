const url = process.env.API_URL;
export default {
  user: {
    main: url + "/User/GetUserList",
    info_edit: url + "/User",
    update: url + "/User",
    register: url + "/AuthManagement/Register",
    create: url + "/User/Create",
    delete: url + "/User",
    profile_edit: url + "/Profile",
    changepw: url + "/Profile/ChangePW",
    resetpw: url + "/User/ResetPW",
    genpw: url + "/User/GeneratePassword",
    roles: url + "/UserRoles/Roles",
    userlist: url + "/User/List"
  },

  case: {
    main: url + "/Case"
  },

  branch:{
    main:  url +'/Branch',
  },

  country:{
    main:  url +'/Country',
  },

  department:{
    main:  url +'/Department',
  },

  hdsystem:{
    main: url+'/HDSystem',
  },

  module:{
    main: url+'/Module',
  },
  topic:{
    main: url+'/Topic',
  },

  receiver: {
    main: url + "/Receiver"
  },

  workplace: {
    main: url + "/Workplace/List"
  },

  comment: {
    main: url + "/Comment"
  }


};
