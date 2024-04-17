class AuthError(Exception):
    def __init__(self, message = "Custom Auth Error"):
        self.message = message
        super().__init__(self.message)
