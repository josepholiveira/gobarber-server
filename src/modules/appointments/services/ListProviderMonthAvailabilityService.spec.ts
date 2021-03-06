import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProvidersMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersMonthAvailability: ListProvidersMonthAvailabilityService;

describe('ListProvidersMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersMonthAvailability = new ListProvidersMonthAvailabilityService(fakeAppointmentsRepository);
  });

  it('should be able to list month availability from provider', async () => { 
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123456',
      // maio = 4
      date: new Date(2020, 4, 20, 8, 0, 0 ),
    });
 
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123456',
      // maio = 4
      date: new Date(2020, 4, 20, 9, 0, 0 ),
    });
 
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123456',
      // maio = 4
      date: new Date(2020, 4, 20, 10, 0, 0 ),
    });
 
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123456',
      // maio = 4
      date: new Date(2020, 4, 20, 11, 0, 0 ),
    });
 
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123456',
      // maio = 4
      date: new Date(2020, 4, 20, 12, 0, 0 ),
    });
 
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123456',
      // maio = 4
      date: new Date(2020, 4, 20, 13, 0, 0 ),
    });
 
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123456',
      // maio = 4
      date: new Date(2020, 4, 20, 14, 0, 0 ),
    });
 
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123456',
      // maio = 4
      date: new Date(2020, 4, 20, 15, 0, 0 ),
    });
 
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123456',
      // maio = 4
      date: new Date(2020, 4, 20, 16, 0, 0 ),
    });
 
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123456',
      // maio = 4
      date: new Date(2020, 4, 20, 17, 0, 0 ),
    });
 
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123456',
      date: new Date(2020, 4, 21, 8, 0, 0 ),
    });

    const availability = await listProvidersMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      //no service maio = 5
      month: 5,
    })

    //sobre a resposta
    //espero que seja um array
    // 20 2 21 com available: false
    expect(availability).toEqual(expect.arrayContaining([
      { day: 19, available: true },
      { day: 20, available: false },
      { day: 21, available: true },
      { day: 22, available: true },
    ]))
  });
});