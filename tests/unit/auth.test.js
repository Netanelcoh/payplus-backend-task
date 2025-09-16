const auth = require('../../middleware/auth');

describe('auth middleware', () => {
  it('should populate req.user with the payload of a valid JWT', () => {
    const user = {id: "88563282-456c-475c-b446-30ae25925529" ,email:"test@gmail.com", full_name: "test #1"};
    const token = generateAuthToken(user);
    const req = {
      header: jest.fn().mockReturnValue(token)
    };
    const res = {};
    const next = jest.fn();
    
    auth(req, res, next);

    expect(req.user).toMatchObject(user);
  });
});