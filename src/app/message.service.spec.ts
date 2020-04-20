import { MessageService } from "./message.service"

describe('Message Service', () => {
let service: MessageService;

beforeEach(()=>{
    // service = new MessageService();
})

it('Should have no messages to start', () => {
    service = new MessageService();
    expect(service.messages.length).toBe(0);
})

it('Should add a new message', () => {
    service = new MessageService();
    service.add("Message1");
    expect(service.messages.length).toBe(1);
})

it('Should clear messages', () => {
    service = new MessageService();
    service.add("Message1");
    service.clear();
    expect(service.messages.length).toBe(0);
})

})