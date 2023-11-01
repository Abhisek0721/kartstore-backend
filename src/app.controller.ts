import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
    @Get("")
    home () {
        return "<h1>Running on Port: 3000</h1>";
    }
}