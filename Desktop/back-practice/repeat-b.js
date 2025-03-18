import http from 'http';

async function main() {
    console.log('start', new Date());

    const PG_URI='postgres://postgres:admin@localhost:5432/my_database';

    const client = new pg.Client(PG_URI);

    await client.connect();

    const res = await client
        .query('select 1+1 as sum')
        .catch((e) => {
            console.log(e.message);

            process.exit(1);
        })

    const server = new http.Server((req, res) => {
        console.log('new req');
        res.end('hello world');
    });

    server.listen(8080);
    console.log('server started at port 8080');
}

main().catch((e) => {
    console.log(e);

    process.exit(1);
});