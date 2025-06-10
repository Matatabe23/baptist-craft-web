import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { RefreshTokens } from './refresh-tokens.repository';

@Table
export class Users extends Model {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number;

	@Column({ unique: true, allowNull: false })
	login: string;

	@Column({ allowNull: false })
	password: string;

	@Column({ allowNull: true })
	avatarUrl: string;

	@Column({ type: DataType.STRING, allowNull: true })
	email: string;

	@Column({ type: DataType.STRING, allowNull: true })
	fullName: string;

	@Column({ type: DataType.DATE, allowNull: true })
	dateOfBirth: Date;

	@Column({ type: DataType.TEXT, allowNull: true })
	bio: string;

	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	isEmailVerified: boolean;

	@Column({ type: DataType.DATE, defaultValue: DataType.NOW })
	createdAt: Date;

	@Column({ type: DataType.DATE, defaultValue: DataType.NOW })
	updatedAt: Date;

	@Column({ type: DataType.DATE, allowNull: true })
	lastLoginAt: Date;

	@HasMany(() => RefreshTokens)
	refreshTokens: RefreshTokens[];
}
