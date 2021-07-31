import React from 'react'
import "../css/Widget.css"
import WidgetContents from './WidgetContent';

function Widget() {
    return (
        <div className="widget">
            <div className="widget__header">
                <h5>Spaces to follow</h5>
            </div>
            <WidgetContents />
        </div>
    )
}

export default Widget
