const db = require('./database');

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});

test('create person', async () => {
    expect.assertions(1);
    const customer = await db.Customer.create({
        id: 1,
        firstName: 'Bobbie',
        lastName: 'Draper'
    });
    expect(customer.id).toEqual(1);
});

test('get customer', async () => {
    expect.assertions(2);
    const customer = await db.Customer.findByPk(1);
    expect(customer.firstName).toEqual('Bobbie');
    expect(customer.lastName).toEqual('Draper');
});

test('delete customer', async () => {
    expect.assertions(1);
    await db.Customer.destroy({
        where: {
            id: 1
        }
    });
    const customer = await db.Customer.findByPk(1);
    expect(customer).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});