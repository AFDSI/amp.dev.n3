describe('ExampleFile', () => {
  const ExampleFile = require('./ExampleFile');
  // const path = require('path');

  // Normalize path separators for cross-platform testing
  const normalizePath = (p) => p.replace(/\\/g, '/');

  describe('created from path', () => {
    const file = ExampleFile.fromPath(
      "src/10_Hello-world's/What's_up_100%25?.html"
    );
    it('extracts title', () => {
      expect(file.title()).toBe("What's up 100%?");
    });
    it('use parent directory name as title if filename is index', () => {
      expect(
        ExampleFile.fromPath('src/Samples_%26_Templates/index.html').title()
      ).toBe('Samples & Templates');
    });
    it('extracts file name', () => {
      expect(file.fileName()).toBe("What's_up_100%25?.html");
    });
    it('extracts category', () => {
      expect(file.category().name).toBe("Hello-world's");
    });
  });

  describe('non-example files', () => {
    const file = ExampleFile.fromPath('src/offline.html');
    it('has no category', () => {
      expect(file.category()).toBe('');
    });
  });

  describe('nextFile', () => {
    const TEST_DIR = __dirname + '/FileNameTestFiles/';
    it('returns next file in alphabetical order', () => {
      const actual = ExampleFile.fromPath(TEST_DIR + 'a.html').nextFile()
        .filePath;
      const expected = TEST_DIR + 'b.html';
      expect(normalizePath(actual)).toEqual(normalizePath(expected));
    });
    it('returns undefined when the file is the last one in alphabetical order', () => {
      expect(ExampleFile.fromPath(TEST_DIR + 'b.html').nextFile()).toEqual(
        null
      );
    });
    it('returns undefined when the file does not exist', () => {
      expect(
        ExampleFile.fromPath(TEST_DIR + 'notExistentFile.html').nextFile()
      ).toEqual(null);
    });
    it('returns undefined when the file has no category', () => {
      expect(
        ExampleFile.fromPath('src/amp-form-error.html').nextFile()
      ).toEqual(null);
    });
  });

  describe('section', () => {
    it('returns parent dir if section', () => {
      expect(
        ExampleFile.fromPath('src/amp-ads/10_introduction/hello.html').section()
          .path
      ).toEqual('/amp-ads');
    });
    it('returns root path if no section', () => {
      expect(
        ExampleFile.fromPath('src/10_introduction/hello.html').section().path
      ).toEqual('/');
    });
    it('returns root path if no category', () => {
      expect(ExampleFile.fromPath('src/hello.html').section().path).toEqual(
        '/'
      );
    });
  });
});
