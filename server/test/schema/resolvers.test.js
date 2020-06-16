import chai from 'chai';
import spies from 'chai-spies';

import Server from '../../src/models/server';
import resolvers from '../../src/schema/resolvers';

chai.use(spies);

describe('resolvers', async () => {
  describe('Query', async () => {

    describe('server', async () => {
      beforeEach(async () => {
        chai.spy.on(Server, 'findById', () => Promise.resolve([]));
      });

      afterEach(async () => {
        chai.spy.restore(Server, 'find');
      });

      it('finds by id', async () => {
        
        const id = 'fake-id';
        const result = await resolvers.Query.server({}, { id }, {}, {});

        chai.expect(Server.findById).to.have.been.called();
        chai.expect(Server.findById).to.have.been.called.with(id);
      });
    });

    describe('servers', async() => {

      beforeEach(() => {        
        const recentServer = { lastReportTime: new Date('10/10/2020').getTime() };
        const oldServer = { lastReportTime: new Date('1/1/2020').getTime() };

        const sortSpy = chai.spy((sortArg) => Promise.resolve([ oldServer, recentServer ]));
        chai.spy.on(Server, 'find', () => ({ sort: sortSpy }));
      })

      afterEach(() => {
        chai.spy.restore(Server, 'find');
      })

      it('gets servers', async () => {

        const result = await resolvers.Query.servers({}, {}, {}, {});
        chai.expect(Server.find).to.have.been.called();
      });
      

      it('orders servers by lastReportTime descending', async () => {
        const result = await resolvers.Query.servers({}, {}, {}, {});
        
        chai.expect(Server.find).to.have.been.called();
        const sortSpy = Server.find({}).sort;
        chai.expect(sortSpy).to.have.been.called.with({ lastReportTime: -1 });
      });
    })
  });
});