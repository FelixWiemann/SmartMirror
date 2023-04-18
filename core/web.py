
from main import isPi
import logging
import time
import functools

def catchException(fun):
    @functools.wraps(fun)
    def wrapper(*args,**kwargs):
        try:
            res = fun(*args,**kwargs)
            return res
        except Exception as ex:
            try:
                import requests
                import traceback
                x = requests.post("http://127.0.0.1:12345/console/error", traceback.format_exc())
            except Exception as e:
                pass
    return wrapper

class web():
    def __init__(self) -> None:
        self.logger = logging.getLogger("webview")
        self.logger.info("starting webview")
        self.startView()

    @catchException
    def startView(self)->None:
        if isPi:
            import gi
            gi.require_version("Soup",'2.4')
        else:
            self.logger.debug("will not activate view on windows")
        import webview
        self.window = webview.create_window("test","http://127.0.0.1:80?islocal=true",fullscreen=isPi, frameless=isPi)
        # self.report = webview.create_window("report","https://speedtest.vodafone.de/report",fullscreen=False, frameless=False)
        # self.speedtest = webview.create_window("speedtest","https://speedtest.vodafone.de/speedtest",fullscreen=False, frameless=False)
        webview.start()    

if __name__=="__main__":
    time.sleep(30)
    web()