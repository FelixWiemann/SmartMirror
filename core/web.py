
from main import isPi
import logging

class web():
    def __init__(self) -> None:
        self.logger = logging.getLogger("webview")
        self.logger.info("starting webview")
        if isPi:
            import gi
            gi.require_version("Soup",'2.4')
            import time
            time.sleep(30) #wait for system to load into ui
        else:
            self.logger.debug("will not activate view on windows")
        import webview
        self.window = webview.create_window("test","http://127.0.0.1:80?islocal=true",fullscreen=isPi, frameless=isPi)
        webview.start()

if __name__=="__main__":
    import utils.logger
    import traceback
    # utils.logger.initLogger()
    print("starting web")
    try:
        web()
    except Exception as ex:
        print("failed to exec :" + traceback.format_exc())
        logging.exception("failed to run web")