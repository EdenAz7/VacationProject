class Config {
  public port = 3001;
  public mysqlHost = "localhost";
  public mysqlUser = "root";
  public mysqlPassword = "12345678";
  public mysqlDatabase = "vacations";
};

const config = new Config();
export default config;

