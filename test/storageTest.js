const truffleContract = require('truffle-contract');
const storageContract = require('../build/contracts/SimpleStorage.json'); 
//2nokta yanyana bi geri klasöre git demek yani'build'

const web3provider = 'http://127.0.0.1:7545'; 

const storage = truffleContract(storageContract);
storage.setProvider(web3provider);
// 1) truffle conractı tanımladık
// 2) projenin abi sını json dosyasını storage contracrta aldık
// 3) 7. satırda içeri aldığımız storage contratını,
// truffle contratının içine alarak akıllı kontratımızı tanımladık


contract('SimpleStorage', (accounts) => {
    let storageInstance;
    const owner = accounts[0];
    const user = accounts[1];

    before(async () => {
        storageInstance = await storage.deployed();
    });

    it ('should set and get a value', async () => {
        const settingValue = 32;
        await storageInstance.set(settingValue, { from: owner });

        const storedValue = await storedInstance.get();
        console.log(storedValue);
        assert.equal(settingValue, storedValue, 'Set ile get değerleri esit olmali ')

    } )
});
// son satırdaki assert komutu  şu şekilde çaşışır:
// olan şey, beklenen şey, (olumsuz durumda göderilecek)mesaj

