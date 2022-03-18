const config = {
  user: "mirra",
  password: "Diaryapp0067",
  database: "Children's Diary App",
  server: "diaryapp.database.windows.net",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: false, // change to true for local dev / self-signed certs
  },
};

export default config;
