import { ListUsersToTransferOutput } from '@/users/application/use-cases/list-users-to-transfer';
import { UserEntity } from '@/users/domain/entities/user.entity';

export class UserPresenter {
  static mapUsersFromOutput(output: ListUsersToTransferOutput) {
    return output.users.map(UserPresenter.mapRequestFromInput);
  }

  static mapRequestFromInput(user: UserEntity): {
    id: string;
    name: string;
  } {
    return {
      id: user.id,
      name: user.name,
    };
  }
}
