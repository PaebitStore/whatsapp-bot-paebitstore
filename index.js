const { Client, Buttons } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Inicia o cliente WhatsApp
const client = new Client({
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

client.on('qr', (qr) => {
    // Gera o QR Code no console
    qrcode.generate(qr, { small: true });
    console.log('Escaneie o QR Code acima para conectar.');
});

client.on('ready', () => {
    console.log('Bot está pronto e conectado!');
});

client.on('message', async (message) => {
    if (message.body.toLowerCase() === 'menu') {
        const options = new Buttons(
            'Escolha uma opção abaixo:',
            [
                { id: 'option1', body: 'Opção 1' },
                { id: 'option2', body: 'Opção 2' },
                { id: 'option3', body: 'Opção 3' },
                { id: 'option4', body: 'Opção 4' }
            ],
            'Menu Principal',
            'Clique em uma das opções abaixo'
        );

        await client.sendMessage(message.from, options);
    }
});

client.on('message', async (message) => {
    if (message.type === 'buttons_response') {
        const selectedOption = message.selectedButtonId;

        switch (selectedOption) {
            case 'option1':
                await client.sendMessage(message.from, 'Você escolheu a Opção 1!');
                break;
            case 'option2':
                await client.sendMessage(message.from, 'Você escolheu a Opção 2!');
                break;
            case 'option3':
                await client.sendMessage(message.from, 'Você escolheu a Opção 3!');
                break;
            case 'option4':
                await client.sendMessage(message.from, 'Você escolheu a Opção 4!');
                break;
            default:
                await client.sendMessage(message.from, 'Opção inválida. Tente novamente.');
                break;
        }
    }
});

client.initialize();
