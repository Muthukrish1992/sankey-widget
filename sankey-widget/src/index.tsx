import * as React from "react";
import { registerWidget, IContextProvider } from './uxp';
import { TitleBar, WidgetWrapper } from "uxp/components";
import { ResponsiveSankey } from '@nivo/sankey';

interface IWidgetProps {
    uxpContext?: IContextProvider,
    instanceId?: string,
    showCustomLabels?: boolean
}

interface Node {
    id: string;
    title: string;

}

interface Data {
    nodes: Node[];
    links: any[]; // Update link type if needed
}

const Sankey_widgetWidget: React.FunctionComponent<IWidgetProps> = (props) => {
    // Sample data
    const data={
        nodes: [
            { id: 'Side Entrance 2', title: 'Start Point'},
            { id: 'Main Entrance', title: 'Start Point'},
            { id: 'Side Entrance 1', title: 'Start Point'},
            { id: 'Health and Wellness', title: '1st Node'},
            { id: 'Beauty and Cosmetics', title: '1st Node' },
            { id: 'Departmental Stores', title: '2nd Node' },
            { id: 'Homeware & Furnishings', title: '2nd Node'},
            { id: 'Entertainment', title: '2nd Node' },
            { id: 'IT & Telecommunications', title: '3rd Node'},
            { id: 'Jewellery & Watches', title: '3rd Node' },
            { id: 'LifeStyle,Hobbies & Gifts', title: '3rd Node'},
            { id: 'Kids', title: '3rd Node'},
            { id: 'Food & Beverages', title: '4th Node'},
            { id: 'Supermarket/Hypermarket', title: '4th Node' },
            { id: 'Shoes & Bags', title: '4th Node' },
            { id: 'Sports & Activewear', title: '4th Node' },
            { id: 'Sundry & Services', title: '4th Node'},
        ],
        links: [
            { source: 'Side Entrance 2', target: 'Health and Wellness', value: 8 },
            { source: 'Main Entrance', target: 'Health and Wellness', value: 5 },
            { source: 'Side Entrance 1', target: 'Beauty and Cosmetics', value: 5 },
            { source: 'Beauty and Cosmetics', target: 'Departmental Stores', value: 10 },
            { source: 'Health and Wellness', target: 'Homeware & Furnishings', value: 2 },
            { source: 'Health and Wellness', target: 'Entertainment', value: 10 },
            { source: 'Departmental Stores', target: 'Jewellery & Watches', value: 10 },
            { source: 'Departmental Stores', target: 'LifeStyle,Hobbies & Gifts', value: 8 },
            { source: 'Homeware & Furnishings', target: 'IT & Telecommunications', value: 10 },
            { source: 'Homeware & Furnishings', target: 'Jewellery & Watches', value: 10 },
            { source: 'Entertainment', target: 'IT & Telecommunications', value: 10 },
            { source: 'Entertainment', target: 'Kids', value: 10 },
            { source: 'IT & Telecommunications', target: 'Food & Beverages', value: 10 },
            { source: 'IT & Telecommunications', target: 'Supermarket/Hypermarket', value: 10 },
            { source: 'IT & Telecommunications', target: 'Shoes & Bags', value: 10 },
            { source: 'LifeStyle,Hobbies & Gifts', target: 'Shoes & Bags', value: 10 },
            
        ],
    };
// Get unique titles
const uniqueTitles = [...new Set(data.nodes.map(node => node.title))];

// Calculate the starting position of each group of nodes
const startingPositions: { [key: string]: string } = {};
data.nodes.forEach(node => {
    if (!(node.title in startingPositions) || node.id.localeCompare(startingPositions[node.title]) < 0) {
        startingPositions[node.title] = node.id;
    }
});
return (
    <WidgetWrapper>
        <TitleBar title='Sankey_widget'>
            {/* No FilterPanel needed */}
        </TitleBar>
        <div style={{ position: 'relative' }}>
        <div style={{ position: 'relative' }}>
    {Object.entries(startingPositions).map(([title, startPosition]) => (
        <div 
            key={title} 
            style={{ 
                position: 'absolute', 
                left: `calc(${(100 / data.nodes.length) * data.nodes.findIndex(node => node.id === startPosition)}% )`,
                transform: 'translate(-5%, -10px)'  // Adjust vertical positioning if needed
            }}
        >
            {title}
        </div>
    ))}
</div>

            <div style={{ position: 'relative', height: '500px', width: '100%' }}>
                <ResponsiveSankey
                    data={data}
                    margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
                    align="justify"
                    colors={{ scheme: 'category10' }}
                    nodeOpacity={1}
                    nodeThickness={18}
                    nodeInnerPadding={3}
                    nodeSpacing={24}
                    nodeBorderWidth={0}
                    nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
                    linkOpacity={0.5}
                    linkHoverOthersOpacity={0.1}
                    enableLabels={true}
                    labelPosition="inside"
                    labelOrientation="horizontal"
                    label={(node: Node) => node.id}
                />
            </div>
        </div>
    </WidgetWrapper>
);

};

registerWidget({
    id: "sankey_widget",
    widget: Sankey_widgetWidget,
    configs: {
        layout: {
            // Adjust layout configuration if needed
        }
    }
});
