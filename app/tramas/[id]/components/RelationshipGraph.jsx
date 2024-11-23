/* eslint-disable react/display-name */
import React, { useState, memo } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { User, Building2, Landmark, FileText, Calendar } from 'lucide-react';

const vibrantOrange = "#FF6B35";

const NodeWrapper = memo(({ children, type }) => {
    const colors = {
        person: 'bg-blue-50 border-blue-300 text-blue-700',
        organization: 'bg-green-50 border-green-300 text-green-700',
        politicalParty: 'bg-purple-50 border-purple-300 text-purple-700',
        document: 'bg-yellow-50 border-yellow-300 text-yellow-700',
        event: 'bg-red-50 border-red-300 text-red-700',
    };

    return (
        <div className={`${colors[type]} border-2 rounded-lg p-3 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg min-w-[200px]`}>
            {children}
        </div>
    );
});

const PersonNode = memo(({ data }) => (
    <NodeWrapper type="person">
        <div className="flex flex-col">
            <div className="flex items-center mb-2">
                <User className="mr-2" size={24} color={vibrantOrange} />
                <div className="font-bold text-sm">{data.label}</div>
            </div>
            <div className="text-xs text-neutral-600">
                <p><strong>Rol:</strong> {data.role}</p>
                <p><strong>Organización:</strong> {data.organization}</p>
                {data.description && <p className="mt-1">{data.description}</p>}
            </div>
        </div>
    </NodeWrapper>
));

const OrganizationNode = memo(({ data }) => (
    <NodeWrapper type="organization">
        <div className="flex flex-col">
            <div className="flex items-center mb-2">
                <Building2 className="mr-2" size={24} color={vibrantOrange} />
                <div className="font-bold text-sm">{data.label}</div>
            </div>
            <div className="text-xs text-neutral-600">
                <p><strong>Tipo:</strong> {data.type}</p>
                <p><strong>Sector:</strong> {data.sector}</p>
                {data.description && <p className="mt-1">{data.description}</p>}
            </div>
        </div>
    </NodeWrapper>
));

const PoliticalPartyNode = memo(({ data }) => (
    <NodeWrapper type="politicalParty">
        <div className="flex flex-col">
            <div className="flex items-center mb-2">
                <Landmark className="mr-2" size={24} color={vibrantOrange} />
                <div className="font-bold text-sm">{data.label}</div>
            </div>
            <div className="text-xs text-neutral-600">
                <p><strong>Tipo:</strong> Partido Político</p>
                {data.ideology && <p><strong>Ideología:</strong> {data.ideology}</p>}
                {data.description && <p className="mt-1">{data.description}</p>}
            </div>
        </div>
    </NodeWrapper>
));

const DocumentNode = memo(({ data }) => (
    <NodeWrapper type="document">
        <div className="flex flex-col">
            <div className="flex items-center mb-2">
                <FileText className="mr-2" size={24} color={vibrantOrange} />
                <div className="font-bold text-sm">{data.label}</div>
            </div>
            <div className="text-xs text-neutral-600">
                <p><strong>Tipo:</strong> {data.type}</p>
                <p><strong>Fecha:</strong> {data.date}</p>
                {data.description && <p className="mt-1">{data.description}</p>}
            </div>
        </div>
    </NodeWrapper>
));

const EventNode = memo(({ data }) => (
    <NodeWrapper type="event">
        <div className="flex flex-col">
            <div className="flex items-center mb-2">
                <Calendar className="mr-2" size={24} color={vibrantOrange} />
                <div className="font-bold text-sm">{data.label}</div>
            </div>
            <div className="text-xs text-neutral-600">
                <p><strong>Fecha:</strong> {data.date}</p>
                <p><strong>Lugar:</strong> {data.place}</p>
                {data.description && <p className="mt-1">{data.description}</p>}
            </div>
        </div>
    </NodeWrapper>
));

const CustomEdge = memo(({ id, source, target, markerEnd, data, style }) => {
    const edgePath = `M ${source.x} ${source.y} L ${target.x} ${target.y}`;

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <text>
                <textPath
                    href={`#${id}`}
                    style={{ fontSize: 12, fill: vibrantOrange, fontWeight: 'bold' }}
                    startOffset="50%"
                    textAnchor="middle"
                >
                    {data.label}
                </textPath>
            </text>
        </>
    );
});

const nodeTypes = {
    person: PersonNode,
    organization: OrganizationNode,
    politicalParty: PoliticalPartyNode,
    document: DocumentNode,
    event: EventNode,
};

const edgeTypes = {
    custom: CustomEdge,
};

const minimapStyle = {
    height: 120,
    backgroundColor: 'rgba(241, 245, 249, 0.7)', // Tailwind's slate-100 with opacity
};

// eslint-disable-next-line react/display-name
const NodeTooltip = memo(({ node }) => (
    <div
        className="absolute bg-white p-2 rounded-md shadow-lg z-50 text-sm border border-neutral-200"
        style={{
            top: `${node.position.y}px`,
            left: `${node.position.x + 220}px`,
            transform: 'translateY(-50%)',
        }}
    >
        <h3 className="font-bold text-[#FF6B35]">{node.data.label}</h3>
        <p className="text-neutral-600">{node.data.description}</p>
    </div>
));

const RelationshipGraph = ({ nodes: initialNodes, edges: initialEdges, onNodeClick }) => {
    const [nodes] = useNodesState(initialNodes);
    const [edges] = useEdgesState(initialEdges);
    const [hoveredNode, setHoveredNode] = useState(null);

    const handleNodeMouseEnter = (event, node) => {
        setHoveredNode(node);
    };

    const handleNodeMouseLeave = () => {
        setHoveredNode(null);
    };

    return (
        <div className="w-full h-full bg-transparent">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodeClick={onNodeClick}
                onNodeMouseEnter={handleNodeMouseEnter}
                onNodeMouseLeave={handleNodeMouseLeave}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView={true}
                fitViewOptions={{
                    maxZoom: 0.8,
                    duration: 4
                }
                }
                minZoom={0.1}
                maxZoom={2}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                zoomOnScroll={true}
                panOnScroll={true}
                preventScrolling={false}
            >
                <Background color="#e5e5e5" variant="dots" />
                <Controls className="bg-white shadow-md rounded-md" />
                <MiniMap style={minimapStyle} zoomable pannable />
            </ReactFlow>
            {hoveredNode && <NodeTooltip node={hoveredNode} />}
        </div>
    );
};

export default RelationshipGraph;