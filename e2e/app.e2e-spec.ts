import { VodafonePage } from './app.po';

describe('vodafone App', () => {
  let page: VodafonePage;

  beforeEach(() => {
    page = new VodafonePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
