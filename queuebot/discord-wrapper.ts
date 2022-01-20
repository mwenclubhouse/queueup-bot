const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
import Discord, { Channel, DMChannel, Guild, GuildMember, Message, NewsChannel, TextChannel, Snowflake, Client } from "discord.js";
var d = new Date();
const path = require("path");

class Permissions {
    connect: any[] | null;
    command: string;
    data: any;
    server_id: Snowflake;
    rooms: [any, any][];
    constructor(server_id: Snowflake) {
        this.connect = get_server_db_connection(server_id);
        this.command = "SELECT * FROM rooms;"
        this.data = get_sqlite_data(this.connect, this.command)
        this.server_id = server_id;
        if (this.data != null) {
            this.data.array.forEach((element: string | any[]) => {
                this.rooms.push([element.at(0), element.at(1)]);
            });
        }
    }

    
    async remove_permissions_from_all_rooms(student: GuildMember) {
        var client: any = DiscordWrapper.client;

    }
}

function get_db_connection(file_location: string, force_create: Boolean = false) {
    var is_setup: Boolean = false;
    var connection: any;
    if(file_location != null) {
        is_setup = fs.path.isfile(file_location);
        if (force_create || is_setup) {
            connection = new sqlite3.Database(file_location)
        }
    }
    return new Array(is_setup, connection);
}

function get_server_db_connection(server_id: Snowflake, force_create: Boolean = false) {
    if(Db.database_folder_location == "") {
        return null;
    }
    return get_db_connection(path.join(Db.database_folder_location, "/", server_id), force_create = force_create);
}

function create_directory(directory_name: string) {
    if (directory_name != null) {
        fs.mkdir(path.join(__dirname, directory_name), (err: any) => {
            if(err) {
                return;
            }
        });
    }
}

function create_db(force_create: Boolean = false, return_connection: Boolean = false) {
    create_directory(Db.database_folder_location);
}

function get_sqlite_data(connection: any, select_command: any, close_connection: Boolean = true) {
    let data = null;
    if (connection.at(1)) {
        let cursor = connection.at(1).cursor();
        cursor.execute(select_command);
        data = cursor.fetchall()
        cursor.close()
        if(close_connection) {
            connection.at(1).close()
        }
    }
    return data;
}

class Db {
    database_file_location : any = null;
    static database_folder_location : string = "";
    server_id : Snowflake;
    permission: Permissions;


    constructor(server_id: Snowflake) {
        this.server_id = server_id;
        this.permission = new Permissions(server_id);


    }
}

class DiscordWrapper {
    client: Client;
    static client: any;
}