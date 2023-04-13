import * as signalR from '@microsoft/signalr';

export const startSignalRConnection = () => {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl('https://api-washouse.azurewebsites.net/messageHub')
        .withAutomaticReconnect()
        .build();

    connection.start().catch((err) => console.error(err));

    return connection;
};
