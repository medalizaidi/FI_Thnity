import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/models/user.entity';
import { AuthModule } from './auth/auth.module';
import { DriverEntity } from './driver/models/driver.entity';
import { DriverModule } from './driver/driver.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres', // Type de base de données (par exemple, mysql, postgresql, etc.)
      host: 'localhost', // Adresse de l'hôte de la base de données
      port: 5432, // Port de la base de données
      username: 'postgres', // Nom d'utilisateur de la base de données
      password: 'rout', // Mot de passe de la base de données
      database: 'new_app', // Nom de la base de données
      entities: [UserEntity, DriverEntity], // Entités utilisées dans votre application
      synchronize: true, // Synchronise automatiquement le schéma de la base de données (utilisation uniquement pour le développement)
    }),
    DriverModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
