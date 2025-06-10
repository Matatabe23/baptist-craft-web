import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Users } from './users.repository';

@Table
export class RefreshTokens extends Model {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number;

	@Column({ type: DataType.TEXT, allowNull: false })
	token: string;

	@Column({ type: DataType.DATE, allowNull: false })
	expiresAt: Date;

	@ForeignKey(() => Users)
	@Column({ allowNull: false })
	userId: number;

	@BelongsTo(() => Users)
	user: Users;

	@Column({ type: DataType.STRING, allowNull: true })
	deviceInfo: string;

	@Column({ type: DataType.DATE, defaultValue: DataType.NOW })
	createdAt: Date;

	@Column({ type: DataType.DATE, defaultValue: DataType.NOW })
	updatedAt: Date;
}
