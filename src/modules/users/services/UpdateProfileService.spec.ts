import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRespository: FakeUsersRespository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRespository = new FakeUsersRespository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(fakeUsersRespository,fakeHashProvider);
  })

  it('should be able to update profile', async () => { 
    const user = await fakeUsersRespository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567'
    });
    
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
    });

    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.email).toBe('johntre@example.com');
  });

  it('should not be able to update to another user email ', async () => { 
    await fakeUsersRespository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567'
    });

    const user = await fakeUsersRespository.create({
      name: 'Teste',
      email: 'test@example.com',
      password: '1234567'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Teste',
      email: 'johndoe@example.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => { 
    const user = await fakeUsersRespository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => { 
    const user = await fakeUsersRespository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@example.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => { 
    const user = await fakeUsersRespository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@example.com',
        old_password: 'wrong-old-password',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});