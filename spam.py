import requests as r
param = {"id": 157869096,"group": -1441153 , "access_token": "321d139160cb582033428c8643dc3f86430b01c676b149f448015f1c98708b589a3e4f35e0434fa8c5eef" }
res = r.get('https://api.vk.com/method/execute.spam', params = param)
