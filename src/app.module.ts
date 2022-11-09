import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { GoogleStrategy } from './google.strategy';
import { FacebookStrategy } from './auth/strategies/facebook.strategy';
import { PostLikeModule } from './post-like/post-like.module';
import { CommentLikeModule } from './comment-like/comment-like.module';
import { BannedModule } from './banned/banned.module';
import { ShareModule } from './share/share.module';
import { FriendlyModule } from './friendly-list/friendly.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
    PostsModule,
    CommentsModule,
    PostLikeModule,
    CommentLikeModule,
    BannedModule,
    ShareModule,
    FriendlyModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, FacebookStrategy],
})
export class AppModule {}
