#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os,sys
import datetime
import random
import time

# check #######################################################################
def check_version():
    v = sys.version_info
    if v.major == 3 and v.minor >= 5:
        return
    print('Your current python is %d.%d. Please use Python 3.6.' % (v.major, v.minor))
    exit(1)
check_version()



# Xmanager-keygen #######################################################################
# https://github.com/DoubleLabyrinth/Xmanager-keygen

sysCode = {
    '0' : 'Xmanager',
    '1' : 'Xshell',
    '2' : 'Xlpd',
    '3' : 'Xfile',
    '4' : 'Xftp',
    '5' : 'Xmanager 3D',
    '6' : 'Xmanager Enterprise',
    '7' : 'Xshell Plus'
}

ProductCode = {
    'Xmanager' : 0,
    'Xshell' : 1,
    'Xlpd' : 2,
    'Xfile' : 3,
    'Xftp' : 4,
    'Xmanager 3D' : 5,
    'Xmanager Enterprise' : 6,
    'Xshell Plus' : 7
}

LicenseType = [
    [ ProductCode['Xmanager'], 0x0B, 0, 'Standard', 2],
    [ ProductCode['Xmanager'], 0x0C, 0, 'Educational', 2],
    [ ProductCode['Xmanager'], 0x0F, 0, 'Standard', 1],
    [ ProductCode['Xmanager'], 0x10, 0, 'Educational', 1],
    [ ProductCode['Xmanager'], 0x16, 2, 'Student 2-year Subscription', 2],
    [ ProductCode['Xmanager'], 0x18, 4, 'Student 4-year Subscription', 2],
    [ ProductCode['Xmanager'], 0x20, 2, 'Student 2-year Subscription', 1],
    [ ProductCode['Xmanager'], 0x22, 4, 'Student 4-year Subscription', 1],
    [ ProductCode['Xmanager'], 0x3D, 0, 'Standard Subscription', 2],
    [ ProductCode['Xmanager'], 0x3E, 0, 'Educational Subscription', 2],
    [ ProductCode['Xmanager'], 0x41, 0, 'Standard Subscription', 1],
    [ ProductCode['Xmanager'], 0x42, 0, 'Educational Subscription', 1],
    [ ProductCode['Xmanager'], 0x47, 0, 'Standard Subscription', 2],      # Concurrent Registered
    [ ProductCode['Xmanager'], 0x48, 0, 'Educational Subscription', 2],   # Concurrent Registered
    [ ProductCode['Xmanager'], 0x4B, 0, 'Standard Subscription', 1],      # Concurrent Registered
    [ ProductCode['Xmanager'], 0x4C, 0, 'Educational Subscription', 1],   # Concurrent Registered
    [ ProductCode['Xmanager'], 0x51, 0, 'Standard', 2],                   # Concurrent Registered
    [ ProductCode['Xmanager'], 0x52, 0, 'Educational', 2],                # Concurrent Registered
    [ ProductCode['Xmanager'], 0x55, 0, 'Standard', 1],                   # Concurrent Registered
    [ ProductCode['Xmanager'], 0x56, 0, 'Educational', 1],                # Concurrent Registered
    [ ProductCode['Xmanager'], 0x60, 0, 'Standard', 1],
    [ ProductCode['Xmanager'], 0x61, 0, 'Standard', 2],
    [ ProductCode['Xmanager'], 0x62, 0, 'Standard', 1],
    [ ProductCode['Xmanager'], 0x63, 0, 'Standard', 2],
    [ ProductCode['Xmanager'], 0x29, 1, 'CLS Class A', 2],
    [ ProductCode['Xmanager'], 0x2A, 1, 'CLS Class B', 2],
    [ ProductCode['Xmanager'], 0x2B, 1, 'CLS Class C', 2],
    [ ProductCode['Xmanager'], 0x2C, 1, 'DLS', 2],
    [ ProductCode['Xmanager'], 0x2D, 1, 'SLS', 2],
    [ ProductCode['Xmanager'], 0x33, 1, 'CLS Class A', 1],
    [ ProductCode['Xmanager'], 0x34, 1, 'CLS Class B', 1],
    [ ProductCode['Xmanager'], 0x35, 1, 'CLS Class C', 1],
    [ ProductCode['Xmanager'], 0x36, 1, 'DLS', 1],
    [ ProductCode['Xmanager'], 0x37, 1, 'SLS', 1],
    [ ProductCode['Xshell Plus'], 0x0B, 0, 'Standard', 2],
    [ ProductCode['Xshell'], 0x0B, 0, 'Standard', 2],
    [ ProductCode['Xshell'], 0x0C, 0, 'Educational', 2],
    [ ProductCode['Xshell'], 0x0F, 0, 'Standard', 1],
    [ ProductCode['Xshell'], 0x10, 0, 'Educational', 1],
    [ ProductCode['Xshell'], 0x16, 2, 'Student 2-year Subscription', 2],
    [ ProductCode['Xshell'], 0x18, 4, 'Student 4-year Subscription', 2],
    [ ProductCode['Xshell'], 0x20, 2, 'Student 2-year Subscription', 1],
    [ ProductCode['Xshell'], 0x22, 4, 'Student 4-year Subscription', 1],
    [ ProductCode['Xshell'], 0x3D, 0, 'Standard Subscription', 2],
    [ ProductCode['Xshell'], 0x3E, 0, 'Educational Subscription', 2],
    [ ProductCode['Xshell'], 0x41, 0, 'Standard Subscription', 1],
    [ ProductCode['Xshell'], 0x42, 0, 'Educational Subscription', 1],
    [ ProductCode['Xshell'], 0x47, 0, 'Standard Subscription', 2],
    [ ProductCode['Xshell'], 0x48, 0, 'Educational Subscription', 2],
    [ ProductCode['Xshell'], 0x4B, 0, 'Standard Subscription', 1],
    [ ProductCode['Xshell'], 0x4C, 0, 'Educational Subscription', 1],
    [ ProductCode['Xshell'], 0x51, 0, 'Standard', 2],
    [ ProductCode['Xshell'], 0x52, 0, 'Educational', 2],
    [ ProductCode['Xshell'], 0x55, 0, 'Standard', 1],
    [ ProductCode['Xshell'], 0x56, 0, 'Educational', 1],
    [ ProductCode['Xshell'], 0x60, 0, 'Standard', 1],   # ������
    [ ProductCode['Xshell'], 0x61, 0, 'Standard', 2],   # ������
    [ ProductCode['Xshell'], 0x62, 0, 'Standard', 1],
    [ ProductCode['Xshell'], 0x63, 0, 'Standard', 2],
    [ ProductCode['Xlpd'], 0x0B, 0, 'Standard', 2],
    [ ProductCode['Xlpd'], 0x0F, 0, 'Standard', 1],
    [ ProductCode['Xlpd'], 0x3D, 0, 'Standard Subscription', 2],
    [ ProductCode['Xlpd'], 0x3E, 0, 'Educational Subscription', 2],
    [ ProductCode['Xlpd'], 0x41, 0, 'Standard Subscription', 1],
    [ ProductCode['Xlpd'], 0x42, 0, 'Educational Subscription', 1],
    [ ProductCode['Xlpd'], 0x47, 0, 'Standard Subscription', 2],
    [ ProductCode['Xlpd'], 0x48, 0, 'Educational Subscription', 2],
    [ ProductCode['Xlpd'], 0x4B, 0, 'Standard Subscription', 1],
    [ ProductCode['Xlpd'], 0x4C, 0, 'Educational Subscription', 1],
    [ ProductCode['Xlpd'], 0x51, 0, 'Standard', 2],
    [ ProductCode['Xlpd'], 0x55, 0, 'Standard', 1],
    [ ProductCode['Xlpd'], 0x60, 0, 'Standard', 1],
    [ ProductCode['Xlpd'], 0x61, 0, 'Standard', 2],
    [ ProductCode['Xlpd'], 0x62, 0, 'Standard', 1],
    [ ProductCode['Xlpd'], 0x63, 0, 'Standard', 2],
    [ ProductCode['Xfile'], 0x0F, 0, 'Standard', 1],
    [ ProductCode['Xftp'], 0x0B, 0, 'Standard', 2],
    [ ProductCode['Xftp'], 0x0F, 0, 'Standard', 1],
    [ ProductCode['Xftp'], 0x3D, 0, 'Standard Subscription', 2],
    [ ProductCode['Xftp'], 0x3E, 0, 'Educational Subscription', 2],
    [ ProductCode['Xftp'], 0x41, 0, 'Standard Subscription', 1],
    [ ProductCode['Xftp'], 0x42, 0, 'Educational Subscription', 1],
    [ ProductCode['Xftp'], 0x47, 0, 'Standard Subscription', 2],
    [ ProductCode['Xftp'], 0x48, 0, 'Educational Subscription', 2],
    [ ProductCode['Xftp'], 0x4B, 0, 'Standard Subscription', 1],
    [ ProductCode['Xftp'], 0x4C, 0, 'Educational Subscription', 1],
    [ ProductCode['Xftp'], 0x51, 0, 'Standard', 2],
    [ ProductCode['Xftp'], 0x55, 0, 'Standard', 1],
    [ ProductCode['Xftp'], 0x60, 0, 'Standard', 1],
    [ ProductCode['Xftp'], 0x61, 0, 'Standard', 2],
    [ ProductCode['Xftp'], 0x62, 0, 'Standard', 1],
    [ ProductCode['Xftp'], 0x63, 0, 'Standard', 2],
    [ ProductCode['Xmanager 3D'], 0x0B, 0, 'Standard', 2],
    [ ProductCode['Xmanager 3D'], 0x0C, 0, 'Educational', 2],
    [ ProductCode['Xmanager 3D'], 0x0F, 0, 'Standard', 1],
    [ ProductCode['Xmanager 3D'], 0x10, 0, 'Educational', 1],
    [ ProductCode['Xmanager Enterprise'], 0x0B, 0, '', 2],
    [ ProductCode['Xmanager Enterprise'], 0x0C, 0, 'Educational', 2],
    [ ProductCode['Xmanager Enterprise'], 0x0F, 0, '', 1],
    [ ProductCode['Xmanager Enterprise'], 0x10, 0, 'Educational', 1],
    [ ProductCode['Xmanager Enterprise'], 0x3D, 0, 'Standard Subscription', 2],
    [ ProductCode['Xmanager Enterprise'], 0x3E, 0, 'Educational Subscription', 2],
    [ ProductCode['Xmanager Enterprise'], 0x41, 0, 'Standard Subscription', 1],
    [ ProductCode['Xmanager Enterprise'], 0x42, 0, 'Educational Subscription', 1],
    [ ProductCode['Xmanager Enterprise'], 0x47, 0, 'Standard Subscription', 2],
    [ ProductCode['Xmanager Enterprise'], 0x48, 0, 'Educational Subscription', 2],
    [ ProductCode['Xmanager Enterprise'], 0x4B, 0, 'Standard Subscription', 1],
    [ ProductCode['Xmanager Enterprise'], 0x4C, 0, 'Educational Subscription', 1],
    [ ProductCode['Xmanager Enterprise'], 0x51, 0, '', 2],
    [ ProductCode['Xmanager Enterprise'], 0x52, 0, 'Educational', 2],
    [ ProductCode['Xmanager Enterprise'], 0x55, 0, '', 1],
    [ ProductCode['Xmanager Enterprise'], 0x56, 0, 'Educational', 1],
    [ ProductCode['Xmanager Enterprise'], 0x60, 0, 'Standard', 1],
    [ ProductCode['Xmanager Enterprise'], 0x61, 0, 'Standard', 2],
    [ ProductCode['Xmanager Enterprise'], 0x62, 0, 'Standard', 1],
    [ ProductCode['Xmanager Enterprise'], 0x63, 0, 'Standard', 2],
]

ProductPublishList = (
    { 'ProductName' : 'Xmanager', 'Version' : 2, 'PublishDate' : datetime.date(2003, 1, 1) },
    { 'ProductName' : 'Xshell', 'Version' : 2, 'PublishDate' : datetime.date(2004, 10, 1) },

    { 'ProductName' : 'Xmanager', 'Version' : 3, 'PublishDate' : datetime.date(2007, 1, 1) },
    { 'ProductName' : 'Xshell', 'Version' : 3, 'PublishDate' : datetime.date(2007, 1, 1) },
    { 'ProductName' : 'Xlpd', 'Version' : 3, 'PublishDate' : datetime.date(2007, 1, 1) },
    { 'ProductName' : 'Xftp', 'Version' : 3, 'PublishDate' : datetime.date(2007, 1, 1) },
    { 'ProductName' : 'Xmanager Enterprise', 'Version' : 3, 'PublishDate' : datetime.date(2007, 1, 1) },

    { 'ProductName' : 'Xmanager', 'Version' : 4, 'PublishDate' : datetime.date(2010, 8, 1) },
    { 'ProductName' : 'Xshell', 'Version' : 4, 'PublishDate' : datetime.date(2010, 8, 1) },
    { 'ProductName' : 'Xlpd', 'Version' : 4, 'PublishDate' : datetime.date(2010, 8, 1) },
    { 'ProductName' : 'Xftp', 'Version' : 4, 'PublishDate' : datetime.date(2010, 8, 1) },
    { 'ProductName' : 'Xmanager Enterprise', 'Version' : 4, 'PublishDate' : datetime.date(2010, 8, 1) },
    { 'ProductName' : 'Xmanager', 'Version' : 5, 'PublishDate' : datetime.date(2014, 4, 28) },
    { 'ProductName' : 'Xshell', 'Version' : 5, 'PublishDate' : datetime.date(2014, 4, 28) },
    { 'ProductName' : 'Xlpd', 'Version' : 5, 'PublishDate' : datetime.date(2014, 4, 28) },
    { 'ProductName' : 'Xftp', 'Version' : 5, 'PublishDate' : datetime.date(2014, 4, 28) },
    { 'ProductName' : 'Xmanager Enterprise', 'Version' : 5, 'PublishDate' : datetime.date(2014, 4, 28) },
    { 'ProductName' : 'Xmanager', 'Version' : 6, 'PublishDate' : datetime.date(2018, 4, 29) },
    { 'ProductName' : 'Xshell', 'Version' : 6, 'PublishDate' : datetime.date(2018, 4, 29) },
    { 'ProductName' : 'Xshell Plus', 'Version' : 6, 'PublishDate' : datetime.date(2018, 4, 29) },
    { 'ProductName' : 'Xlpd', 'Version' : 6, 'PublishDate' : datetime.date(2018, 4, 29) },
    { 'ProductName' : 'Xftp', 'Version' : 6, 'PublishDate' : datetime.date(2018, 4, 29) },
    { 'ProductName' : 'Xmanager Enterprise', 'Version' : 6, 'PublishDate' : datetime.date(2018, 4, 29) }
)

def GetChecksum(preProductKey : str):
    Checksum = 1
    for i in range(0, len(preProductKey)):
        if preProductKey[i] != '-' and preProductKey[i] != '8' and preProductKey[i] != '9':
            place = int(preProductKey[i])
            Checksum = (9 - place) * Checksum % -1000
    Checksum = (Checksum + int(preProductKey[9])) % 1000
    return Checksum

def GenerateProductKey(IssueDate : datetime.date,
                       ProductName : str,
                       ProductVersion : int,
                       NumberOfLicense : int):
    if IssueDate.year < 2002:
        raise ValueError('IssueDate cannot be earlier than 2002.')
    if IssueDate > datetime.date.today() + datetime.timedelta(days = 7):
        raise ValueError('IssueDate cannot be later than today after a week.')
    if NumberOfLicense < 0 or NumberOfLicense > 999:
        raise ValueError('NumberOfLicense must vary from 0 to 999.')

    for item in ProductPublishList:
        if item['ProductName'] == ProductName and item['Version'] == ProductVersion:
            if item['PublishDate'] > IssueDate:
                raise ValueError('IssueDate cannot be earlier than the publish date.')
            break
        if item['ProductName'] == ProductName and str(item['Version']) != ProductVersion:
            raise ValueError('Invalid product.')

    preProductKey = '%02d%02d%02d-%02d%d%03d-%03d' % (IssueDate.year - 2000,
                                                        IssueDate.month,
                                                        IssueDate.day,
                                                        0x0B,
                                                        ProductCode[ProductName],
                                                        random.randint(0, 999),
                                                        NumberOfLicense)
    Checksum = GetChecksum(preProductKey)
    ProductKey = preProductKey + '%03d' % Checksum
    return ProductKey

def getKey(ProductName : str,ProductVersion : int):
    return GenerateProductKey(
        datetime.date(datetime.datetime.now().year,
                      datetime.datetime.now().month,
                      datetime.datetime.now().day), ProductName,
        ProductVersion, 999)








# https://raw.githubusercontent.com/michaelliao/learn-python3/master/teach/learning.py

# start server ################################################################

import os, io, json, subprocess, tempfile
from urllib import parse
from http.server import HTTPServer, BaseHTTPRequestHandler, SimpleHTTPRequestHandler
import socketserver
import threading


EXEC = sys.executable
PORT = 39093
TEMP = tempfile.mkdtemp(suffix='_py', prefix='learn_python_')

HTML_INDEX = r'''
<html>
  <head><title>Learning Python</title></head>
  <body>
    <form method="post" action="/getKey">
      <span>选择产品:</span>
      <select id="pName" name="pName">
        <option value ="Xshell Plus">Xshell Plus</option>
        <option value ="Xmanager Enterprise">Xmanager Enterprise</option>
        <option value="Xftp">Xftp</option>
        <option value="Xlpd">Xlpd</option>
      </select>
      <span>选择版本:</span>
      <select id="pVersion" name="pVersion">
        <option value ="2">2</option>
        <option value ="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
      <button type="submit">点击获取秘钥</button>
    </form>
  </body>
</html>
'''

class LearningHTTPRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.close_connection = True
        if self.path != '/':
            return self.send_error(404)
        self._sendHttpHeader('text/html;charset=utf-8')
        self._sendHttpBody(HTML_INDEX.encode('utf-8', errors='ignore'))

    def do_POST(self):
        self.close_connection = True
        if self.path != '/getKey':
            return self.send_error(400)
        print('Prepare code...')
        body = self.rfile.read(int(self.headers['Content-length']))
        qs = parse.parse_qs(body.decode('utf-8'))
        if not 'pName' in qs or not 'pVersion' in qs:
            return self.send_error(400)
        pName = qs['pName'][0]
        pVersion = qs['pVersion'][0]
        
        r = dict()
        try:
            fpath = write_py(get_name(), pName)
            print('Execute: %s %s' % (EXEC, fpath))
            r =  pName + pVersion + " 秘钥：" + getKey(pName,pVersion)
            # r['output'] = decode(subprocess.check_output([EXEC, fpath], stderr=subprocess.STDOUT, timeout=5))
        
        except ValueError as e:
            r = dict(error='Exception', output='参数错误')
        except subprocess.CalledProcessError as e:
            r = dict(error='Exception', output=decode(e.output))
        except subprocess.TimeoutExpired as e:
            r = dict(error='Timeout', output='执行超时')
        except subprocess.CalledProcessError as e:
            r = dict(error='Error', output='执行错误')
        print(r)
        self._sendHttpHeader()
        self._sendHttpBody(r)

    def _sendHttpHeader(self, contentType='application/json;charset=utf-8'):
        origin = self.headers['Origin']
        self.send_response(200)
        self.send_header('Content-Type', contentType)
        self.send_header('Access-Control-Allow-Origin', origin)
        self.send_header('Access-Control-Allow-Methods', 'GET,POST')
        self.send_header('Access-Control-Max-Age', '86400')
        self.end_headers()

    def _sendHttpBody(self, data):
        body = b''
        if isinstance(data, bytes):
            body = data
        elif isinstance(data, str):
            body = data.encode('utf-8', errors='ignore')
        else:
            body = json.dumps(data,ensure_ascii=False).encode('utf-8', errors='ignore')
        self.wfile.write(body)

class ThreadingHttpServer( socketserver.ThreadingMixIn, HTTPServer ):
    pass

def main():
    httpd = ThreadingHttpServer(('', PORT), LearningHTTPRequestHandler)
    print('Ready for Python code on port %d...' % PORT)
    print('Press Ctrl + C to exit...')
    httpd.serve_forever()
    # server_thread = threading.Thread(target=httpd.serve_forever())
    # Exit the server thread when the main thread terminates
    # server_thread.setDaemon(True)
    # server_thread.start()

# functions ###################################################################

INDEX = 0

def get_name():
    global INDEX
    INDEX = INDEX + 1
    return 'test_%d' % INDEX

def write_py(name, code):
    fpath = os.path.join(TEMP, '%s.py' % name)
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(code)
    print('Code wrote to: %s' % fpath)
    return fpath

def decode(s):
    try:
        return s.decode('utf-8')
    # except AttributeError:
    #     return s.encode('utf-8')
    except UnicodeDecodeError:
        return s.decode('gbk')

if __name__ == '__main__':
    main()
