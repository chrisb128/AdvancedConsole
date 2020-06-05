import { expect } from 'chai';

import bcrypt from 'bcryptjs';
import { checkPasswordMatch, generatePasswordHash } from '../../src/services/auth';


describe('auth', function() {
  describe('checkPasswordsMatch', function() {

    before(async function() {      
      this.testPassword = 'testpassword123**&&';
      const salt = await bcrypt.genSalt(10);
      this.testHash = await bcrypt.hash(this.testPassword, salt);
    });

    it('should return true when test matches the hash', async function () {
      const isMatch = await checkPasswordMatch(this.testPassword, this.testHash);
      expect(isMatch).to.equal(true);
    });

    it('should return false when test does not match hash', async function() {
      const isMatch = await checkPasswordMatch(this.testPassword + 'breakme', this.testHash);
      expect(isMatch).to.equal(false);
    });
  });

  describe('generatePasswordHash', function () {
    it('should return something', async function() {
      const hash = await generatePasswordHash('hellopassword');
      expect(hash).to.be.a('string');
      expect(hash).to.not.be.empty;
    });
  });
});