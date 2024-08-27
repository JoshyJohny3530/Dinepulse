namespace DinePulse_API.Utils
{
    public class LogHelper
    {
        private static System.Threading.ReaderWriterLockSlim _readWriteLock = new System.Threading.ReaderWriterLockSlim();
        public void LogError(string ex)
        {
            try
            {
                string sErrorTime;
                string sYear = DateTime.Now.Year.ToString();
                string sMonth = DateTime.Now.Month.ToString();
                string sDay = DateTime.Now.Day.ToString();

                sErrorTime = sYear + sMonth + sDay;

                string sLogFormat;

                sLogFormat = "ErrorLog\\ErrorLog" + sErrorTime + ".txt";

                string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;
                message += string.Format("Message: {0}", ex);
                message += Environment.NewLine;

                message += Environment.NewLine;
                message += "-----------------------------------------------------------";
                message += Environment.NewLine;


                //var webRoot = _env.WebRootPath;

                var path = Path.Combine(
                            Directory.GetCurrentDirectory(), "wwwroot",
                            sLogFormat);

                //string path = Hosting.HostingEnvironment.MapPath(sLogFormat);
                _readWriteLock.EnterWriteLock();
                try
                {

                    using (StreamWriter writer = new StreamWriter(path, true))
                    {
                        writer.WriteLine(message);
                        writer.Close();
                    }
                }

                finally
                {
                    _readWriteLock.ExitWriteLock();
                }
            }
            catch
            {

            }

        }
    }
}
