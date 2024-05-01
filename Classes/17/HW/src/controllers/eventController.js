const { addAnEvent, getFullEventList, getEventDetails } = require('../services/eventService.js');
const { getCurrentTimeWithSeconds } = require('../services/utils.js');
const { Events } = require('../models/events.js')

const createEvent = async (ctx) => {
    const requestInboundTime = getCurrentTimeWithSeconds();

    ctx.body = {
        responeSummary: 'Add an event to the system',
        verdict: await addAnEvent(ctx.request.body),
        requestInboundTime: requestInboundTime,
        requestOutboundTime: getCurrentTimeWithSeconds(),
    };

    ctx.status = 201;
};

const getEventById = async (ctx) => {
    const requestInboundTime = getCurrentTimeWithSeconds();

    ctx.body = {
        responeSummary: 'Details of a specific event',
        requestInboundTime: requestInboundTime,
        requestOutboundTime: getCurrentTimeWithSeconds(),
    };

    const event = getEventDetails(ctx.params.id);
    if (!event) {
        ctx.status = 404;
        ctx.body.verdict = "Event not found!";
        return;
    }

    ctx.body.verdict = "Event found!";
    ctx.body.event = event;
    ctx.status = 200;
};

const getAllEvents = async (ctx) => {
    const requestInboundTime = getCurrentTimeWithSeconds();
    ctx.body = {
        events: getFullEventList(),
        requestInboundTime: requestInboundTime,
        requestOutboundTime: getCurrentTimeWithSeconds(),
    };
};


const deleteEvent = async (ctx) => {

    const requestInboundTime = getCurrentTimeWithSeconds();
    try {
        const id = ctx.params.id;
        const verdict = await Events.deleteEvent(id);
        
        const responseBody = {
            statusDetails : verdict.statusDetails,
            requestInboundTime: requestInboundTime,
            requestOutboundTime: getCurrentTimeWithSeconds(),
        }
        ctx.response.ok('Event not found' , responseBody);
    } catch (error) {
        ctx.response.internalError('Internal Server Error');
    }
};

module.exports = {
    createEvent,
    getEventById,
    getAllEvents,
    deleteEvent
};
