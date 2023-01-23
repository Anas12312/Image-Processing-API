import supertest from 'supertest';
import app from '..';
import cloneImage from '../utilities/cloneImage';

// Testing the End Point
const request = supertest(app);
describe('Test endpoint responses', () => {
  // Tests if the Endpoint is Working
  it('Expect to Send the resized File', async () => {
    const response = await request.get(
      '/api/images?' + 'filename=fjord&width=200&height=200'
    );
    expect(response.statusCode).toBe(200);
  });

  // Tests if the Wrong filename is Handled
  it("Expect to Send File Doesn't Exist", async () => {
    const response = await request.get(
      '/api/images?' + 'filename=noFile&width=200&height=200'
    );
    expect(response.statusCode).toBe(404);
  });

  //Tests if the missing Query Parameters is Handled
  it('Expect to Send Not Enough Parameters', async () => {
    const response = await request.get('/api/images?' + 'filename=noFile');
    expect(response.statusCode).toBe(400);
  });

  it('Expect to Send Not Valid Parameters', async () => {
    const response = await request.get(
      '/api/images?' + 'filename=noFile&width=abc&height=abc'
    );
    expect(response.statusCode).toBe(400);
  });
});

// Testing the Sharp's Function (cloneImage)
describe('Test the Clone Image', () => {
  // Test if the Function is Working
  it('Expect to Return True', async () => {
    const result = await cloneImage('palmtunnel', '200', '200');
    expect(result).toBe(true);
  });

  // Test if the Function return False if wrong paramters
  it('Expect to Return False', async () => {
    const result = await cloneImage('noFile', '200', '200');
    expect(result).toBe(false);
  });
});
