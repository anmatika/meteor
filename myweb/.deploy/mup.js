module.exports = {
  servers: {
    one: {
        host: '35.160.11.138',
        username: 'ubuntu',
        pem: 'c:/Users/anttim/.ssh/ubuntu-aws.pem'
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'myweb',
    path: '../../myweb',
    servers: {
      one: {}
    },
    docker: {
        image:'abernix/meteord:base',// !important for meteor 1.4
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'http://35.160.11.138',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 60
  },
   "setupMongo": true,

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
