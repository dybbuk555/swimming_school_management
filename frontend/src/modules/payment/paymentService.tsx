import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class PaymentService {
  static async create(id, data) {
    const body = {
      id,
      data,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.put(
      `/tenant/${tenantId}/payment/${id}`,
      body,
    );

    return response.data;
  }

  static async destroyAll(paymentIds) {
    const params = {
      paymentIds,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.delete(
      `/tenant/${tenantId}/payment`,
      {
        params,
      },
    );

    return response.data;
  }

  static async fetchExpiredList(
    filter,
    orderBy,
    limit,
    offset,
  ) {
    const params = {
      filter,
      orderBy,
      limit,
      offset,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/expired`,
      {
        params,
      },
    );

    return response.data;
  }
}
