const fUtil = require('../misc/file');
const stuff = require('./info');

function toAttrString(table) {
	return typeof (table) == 'object' ? Object.keys(table).filter(key => table[key] !== null).map(key =>
		`${encodeURIComponent(key)}=${encodeURIComponent(table[key])}`).join('&') : table.replace(/"/g, "\\\"");
}
function toParamString(table) {
	return Object.keys(table).map(key =>
		`<param name="${key}" value="${toAttrString(table[key])}">`
	).join(' ');
}
function toObjectString(attrs, params, navbar) {
	return `<object id="obj" ${Object.keys(attrs).map(key =>
		`${key}="${attrs[key].replace(/"/g, "\\\"")}"`
	).join(' ')}>${toParamString(params)}</object>`;
}

module.exports = function (req, res, url) {
	if (req.method != 'GET') return;
	const query = url.query;

	var attrs, params, title;
	switch (url.pathname) {
	case '/ajax/getMovieShare/': {
		attrs = {
				data: process.env.SWF_URL + '/player.swf',
				type: 'application/x-shockwave-flash', width: '100%', height: '100%',
			};
			params = {
				flashvars: {
					'video': '', 
				},
			};
			break;
		}
		default:
			return;
	}
	res.setHeader('Content-Type', 'text/html; charset=UTF-8');
	Object.assign(params.flashvars, query);
	res.end(
	`<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <button class="close" type="button" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h3 class="modal-title">Share video</h3>
        </div>
        <div class="modal-body">

            <h4 class="compact">Embed this GoAnimate video on other sites</h4>
            <p>Let users watch this GoAnimate video on other sites using the GoAnimate embedded player.</p>
            <div class="row">
                <div class="col-md-6"> 
                                    </div>
                <div class="col-md-6">
                                        <div class="input-group">
                        <span class="input-group-addon">&lt;/&gt;</span>
                        <input class="form-control gtm-ga-event" type="text" value="<iframe scrolling=&quot;no&quot; allowTransparency=&quot;true&quot; allowfullscreen frameborder=&quot;0&quot; width=&quot;640&quot; height=&quot;360&quot; src=&quot;https://vyondlegacyoffical.herokuapp.com/player/embed/?movieId=${params.flashvars.video}utm_source=social&amp;utm_medium=tumblr&amp;utm_campaign=usercontent&quot; ></iframe>
" data-gtmv-action="Embed - Click text field" data-gtmv-category="" data-gtmv-label="13529187 - Guest" onclick="amplitudeTrackShare(AMPLITUDE_EVENT_PROPERTIES.SHARE_EMBED); this.focus();this.select()">
                    </div>
                                    </div>
            </div>

            <div class="modal-body-separator"></div>

            <h4 class="compact">Share a link to this GoAnimate video</h4>
            <p>Users clicking this link will watch this video on GoAnimate.</p>
            <div class="row">
                <div class="col-md-6"> 
                                    </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <span class="input-group-addon">URL</span>
                        <input class="form-control gtm-ga-event" type="text" value="https://vyondlegacyoffical.herokuapp.com/player/embed/?movieId=${params.flashvars.video}utm_source=linkshare&amp;utm_medium=linkshare&amp;utm_campaign=usercontent" data-gtmv-action="Share - Click text field" data-gtmv-category="" data-gtmv-label="13529187 - Guest" onclick="amplitudeTrackShare(AMPLITUDE_EVENT_PROPERTIES.SHARE_LINK_SHARE); this.focus(); this.select()">
                    </div>
                </div>
            </div>

        </div>
        <div class="modal-footer">
            <button class="btn btn-default" type="button" data-dismiss="modal">Close</button>
        </div>
    </div>
</div>`
		);
	return true;
}
