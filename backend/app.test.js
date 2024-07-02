const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./app');
const Address = require('./models/address');
const {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress
} = require("./controllers/addressControllers");

const connectDB = require('./config/db');

beforeAll(async () => {
  await connectDB(); // Connect to MongoDB before all tests
});

afterAll(async () => {
  await mongoose.connection.close(); // Close MongoDB connection after all tests
});

test('should handle errors and respond with a 500 status code and an error message', async () => {
  const error = new Error('Database error');
  Address.find = jest.fn().mockRejectedValue(error);

  const req = {};
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await getAddresses(req, res);

  expect(Address.find).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ error: error.message });
});

describe('getAddresses', () => {
it('should get all addresses', async () => {
  const mockAddresses = [
    { _id: '1', name: 'John Doe', email: 'john@example.com', address: '123 Main St' },
    { _id: '2', name: 'Jane Doe', email: 'jane@example.com', address: '456 Elm St' },
  ];

})
})

describe('updateAddress', () => {
test('should update an address and respond with a 200 status code and the updated address', async () => {
  const addressId = '001';
  const updatedAddressData = {
    name: 'John Doe Updated',
    email: 'john_updated@example.com',
    contact: '1234567890',
    address: '123 Main St Updated'
  };
}

//     };

//     await createAddress(req, res);

//     expect(Address.create).toHaveBeenCalledWith(addressToAdd);
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith(addressToAdd);
  // });

  // test('should handle errors and respond with a 400 status code and an error message', async () => {
  //   const error = new Error('Database error');  
  //   Address.create = jest.fn().mockRejectedValue(error);

  //   const req = { body: {} };
  //   const res = {
  //     status: jest.fn().mockReturnThis(),  
  //     json: jest.fn(),
  //   };

  //   await createAddress(req, res);

  //   expect(Address.create).toHaveBeenCalledWith(req.body);
  //   expect(res.status).toHaveBeenCalledWith(400);
  //   expect(res.json).toHaveBeenCalledWith({ error: error.message });
  // });
// });  

// describe('getAddresses', () => {
//   test('should return addresses and respond with a 200 status code', async () => {
//     const addressData = [
//       {
//         name: 'John Doe',  
//         email: 'john@example.com',
//         contact: '1234567890',
//         address: '123 Main St'
//       },
//       {
//         name: 'Jane Doe',  
//         email: 'jane@example.com',
//         contact: '0987654321',
//         address: '456 Elm St'
//       }
//     ];

//     Address.find = jest.fn().mockResolvedValue(addressData);

//     const req = {};
//     const res = {
//       status: jest.fn().mockReturnThis(),  
//       json: jest.fn(),
//     };

//     await getAddresses(req, res);

//     expect(Address.find).toHaveBeenCalled();
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(addressData);
//   });

//     Address.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedAddressData);

//     const req = { params: { id: addressId }, body: updatedAddressData };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     await updateAddress(req, res);

//     expect(Address.findByIdAndUpdate).toHaveBeenCalledWith(addressId, updatedAddressData, { new: true });
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(updatedAddressData);
//   });
  // });
  ,test('should handle not finding an address and respond with a 404 status code', async () => {
    Address.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

    const req = { params: { id: 'nonExistentAddress' }, body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  })
  )

})

describe('getEntireData', () => {
  test('should return all addresses in database', async () => {
    const addressData = [
      { _id: '1', name: 'Jerry Mouse', email: 'jerry@example.com', contact: '1234567890', address: '4556 Main St' },
      { _id: '2', name: 'Maxi max', email: 'maxi@example.com', contact: '0987654321', address: '619 Elm St' },
      { _id: '3', name: 'John Doe', email: 'john@example.com', contact: '1234567890', address: '123 Main St' },
      { _id: '4', name: 'Jane Doe', email: 'jane@example.com', contact: '0257654321', address: '456 Elm St' },
    ];
  })

  test('should return an empty list and respond with a 200 status code', async () => {
    Address.find = jest.fn().mockResolvedValue([]);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAddresses(req, res);

    expect(Address.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  describe('createAddress', () => {
    test('should add an address and respond with a 201 status code and the created address', async () => {
      const addressToAdd = {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '1234567890',
        address: '123 Main St'
      };
  
      const savedAddress = {
        _id: '1',
        ...addressToAdd
      };
  
      Address.prototype.save = jest.fn().mockResolvedValue(savedAddress);
  
      const req = { body: addressToAdd };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createAddress(req, res);
  
      expect(Address.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(savedAddress);
    });
  
    test('should handle errors and respond with a 400 status code and an error message', async () => {
      const error = new Error('Database error');
      Address.prototype.save = jest.fn().mockRejectedValue(error);
  
      const req = { body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createAddress(req, res);
  
      expect(Address.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('updateAddress', () => {
    test('should_update_an_address_and_respond_with_a_200_status', async () => {
      const addressId = '1';
      const updatedAddressData = {
        name: 'John Doe Updated',
        email: 'john_updated@example.com',
        contact: '1234567890',
        address: '123 Main St Updated'
      };
  
      const updatedAddress = {
        _id: addressId,
        ...updatedAddressData
      };
  
      Address.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedAddress);
  
      const req = { params: { id: addressId }, body: updatedAddressData };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await updateAddress(req, res);
  
    });

    describe('updateAddress', () => {
      test('should_update_an_address_and_respond_with_a_200_status_code_and_the_updated_address', async () => {
        const addressId = '1';
        const updatedAddressData = {
          name: 'John Doe Updated',
          email: 'john_updated@example.com',
          contact: '1234567890',
          address: '123 Main St Updated'
        };
    
        const updatedAddress = {
          _id: addressId,
          ...updatedAddressData
        };
    
        Address.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedAddress);
    
        const req = { params: { id: addressId }, body: updatedAddressData };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
    
        await updateAddress(req, res);
    
        expect(Address.findByIdAndUpdate).toHaveBeenCalledWith(addressId, updatedAddressData, { new: true });
        expect(res.json).toHaveBeenCalledWith(updatedAddress);
      });
    })
  
    test('should_handle_errors_and_respond_with_a_400_status', async () => {
      const error = new Error('Database error');
      Address.findByIdAndUpdate = jest.fn().mockRejectedValue(error);
  
      const req = { params: { id: '1' }, body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await updateAddress(req, res);
  
      expect(Address.findByIdAndUpdate).toHaveBeenCalledWith('1', {}, { new: true });
    });

    test('should_handle_errors_and_respond_with_a_400_status_and_error_message', async () => {
      const error = new Error('Database error');
      Address.findByIdAndUpdate = jest.fn().mockRejectedValue(error);
  
      const req = { params: { id: '1' }, body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await updateAddress(req, res);
  
      expect(Address.findByIdAndUpdate).toHaveBeenCalledWith('1', {}, { new: true });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });

    describe('deleteAddress', () => {
      test('should_delete_an_address_and_respond_with_a_200_status', async () => {
        const addressId = '1';
    
        Address.findByIdAndDelete = jest.fn().mockResolvedValue(true);
    
        const req = { params: { id: addressId } };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      })

      describe('deleteAddress', () => {
        test('should_delete_an_address_and_respond_with_a_200_status_and_message_for_user', async () => {
          const addressId = '1';
      
          Address.findByIdAndDelete = jest.fn().mockResolvedValue(true);
      
          const req = { params: { id: addressId } };
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
     
        await deleteAddress(req, res);
    
        expect(Address.findByIdAndDelete).toHaveBeenCalledWith(addressId);
        expect(res.json).toHaveBeenCalledWith({ message: 'Address deleted' });
      });

        })
    
      test('should handle errors and respond with a 500 status code and an error message', async () => {
        const error = new Error('Database error');
        Address.findByIdAndDelete = jest.fn().mockRejectedValue(error);
    
        const req = { params: { id: '1' } };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
    
        await deleteAddress(req, res);
    
        expect(Address.findByIdAndDelete).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: error.message });
      });
  
    
       
    });
    
  
  });
  
})