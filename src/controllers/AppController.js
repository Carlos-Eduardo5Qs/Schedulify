class AppController {

  getHome (req, res) {
    res.send('Welcome to the API!');
  }

  getStatus (req, res) {
    res.status(200).json({ status: 'Okay!' });
  }
}

export const appController = new AppController();
