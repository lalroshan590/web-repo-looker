import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    let users = [] as { user: string, repos: string[] }[]
    console.log(fs.readdirSync('public/repos'));
    fs.readdirSync('public/repos').forEach(user => {
      if(user === '.gitkeep') return;
      users.push({ 
        user: user,
        repos: []
      });

      fs.readdirSync(`public/repos/${user}`).forEach(repo => {
        users[users.length - 1].repos.push(repo);
      });
    });

    return { 
      message: 'Hello world! rendered',
      users: users
    };
  }
}
