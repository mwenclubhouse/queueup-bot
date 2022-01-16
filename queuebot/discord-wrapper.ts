const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
import Discord, { Channel, DMChannel, Guild, GuildMember, Message, NewsChannel, TextChannel, Snowflake } from "discord.js";
var d = new Date();
const path = require("path");


class Permissions {
    constructor(server_id: Snowflake) {
        let connection = get_server_db_connection(server_id);
        let command = "SELECT * FROM rooms;"

    }
}

function get_db_connection(file_location: string, force_create: Boolean = false) {
    var is_setup: Boolean = false;
    var connection: any;
    if(file_location != null) {
        is_setup = fs.path.isfile(file_location);
        if (force_create || is_setup) {
            //connection = new sqlite3.Database(file_location)
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
