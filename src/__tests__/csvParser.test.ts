import { parseCsv } from '../util/csv.util';

describe('Test csv parser', () => {
    let file: File;

    beforeEach(() => {
        file = new File(["Zmlyc3RfbmFtZTtzdXJfbmFtZTtpc3N1ZV9jb3VudDtkYXRlX29mX2JpcnRoCk1hdXJvO0RyZW50aGU7MjY7Tm92IDI2LCA2OApTaWxhO0hvb2dzdGVlbjszMTtKdW4gMjksIDcyCkJpbmc7Qm9vZGU7MztPY3QgMjUsIDgwCk1hcmljaztIb2x0cm9wOzY1O0phbiAxOCwgOTUKUmF2ZW5uYTtTY2hvdXRlbjsxODtKdW4gMTgsIDg2CkFiZGVsaGFkaTtIb29na2FtcDs0NztNYXIgMjEsIDcyClN1enk7QmVybmFkaW5hOzI3O09jdCA2LCA2NQpKdXJyaXQ7UmFqYTs3MTtGZWIgMjcsIDUyCkFsZXY7dmFuIEtvb3RlbjszMDtPY3QgMjQsIDcxCkN5cmFubztIb29nZW5rYW1wOzI4O0F1ZyAxNSwgNzQKU2FzY2hhO05pZW1hbjs4MztKdW4gMjIsIDczCkZyZWVrZTtIZWtraW5nOzU0O0p1biAyOCwgNzY="], "files.csv", { type: "text/csv;charset=utf-8;" });
    });

    test('Run file throught csv parser', async () => {
        expect(typeof await parseCsv(file)).toBe('string');
    });    
});