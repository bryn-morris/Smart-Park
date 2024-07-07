from flask import Blueprint, make_response
from flask_restful import Resource
from config import api

http_test_routes=Blueprint('http_test_routes', __name__)

class Test401(Resource):
    def get(self):
        return make_response({"error":"401TestError"}, 401)
    
api.add_resource(Test401, '/test401')

class Test501(Resource):
    def get(self):
        return make_response({"error":"501 test server error"}, 501)

api.add_resource(Test501, '/test501')
