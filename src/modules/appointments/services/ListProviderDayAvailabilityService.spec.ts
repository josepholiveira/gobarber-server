// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProvidersDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersDayAvailability: ListProvidersDayAvailabilityService;

describe('ListProvidersDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersDayAvailability = new ListProvidersDayAvailabilityService(fakeAppointmentsRepository);
  });

  it('should be able to list day availability from provider', async () => { 
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      // maio = 4
      date: new Date(2020, 4, 20, 14, 0, 0 ),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      // maio = 4
      date: new Date(2020, 4, 20, 15, 0, 0 ),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11, 0, 0).getTime();
    });

    const availability = await listProvidersDayAvailability.execute({
      provider_id: 'user',
      year: 2020,
      //no service maio = 5
      month: 5,
      day: 20
    })

    //sobre a resposta
    //espero que seja um array
    // 20 2 21 com available: false
    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false },
      { hour: 9, available: false },
      { hour: 10, available: false },
      { hour: 13, available: true },
      { hour: 14, available: false },
      { hour: 15, available: false },
      { hour: 16, available: true },
    ]))
  });
});