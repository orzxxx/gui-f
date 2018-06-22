import React, { PureComponent, PropTypes } from 'react'
import { Tree, Dropdown, Menu } from 'antd';

const TreeNode = Tree.TreeNode;

class RedisConnectionTree extends PureComponent {

    static defaultProps = {
        treeNodes: []
    };

    handleClickConnect = (id) => {
        this.props.onClickConnect(id);
    };

    handleClickDisconnect = () => {
        this.props.onClickDisconnect();
    };

    handleClickEdit = (id) => {
        this.props.onClickEdit(id);
    };

    handleClickRemove = (id) => {
        this.props.onClickRemove(id);
    };

    renderMenu = (id) => {
        const { connectedId } = this.props;

        return (
            <Menu>
                <Menu.Item key="1" disabled={connectedId === id} onClick={() => this.handleClickConnect(id)}>connect</Menu.Item>
                <Menu.Item key="2" disabled={connectedId !== id} onClick={this.handleClickDisconnect}>disconnect</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3" disabled={connectedId === id} onClick={() => this.handleClickEdit(id)}>edit</Menu.Item>
                <Menu.Item key="4" disabled={connectedId === id} onClick={() => this.handleClickRemove(id)}>delete</Menu.Item>
            </Menu>
        );
    };

    render() {
        const { treeNodes } = this.props;

        return (
            <Tree
                onSelect={this.onSelect}
                onCheck={this.onCheck}
            >
                {treeNodes.map(n =>
                    <TreeNode title={<Dropdown overlay={this.renderMenu(n.id)} trigger={['contextMenu']}><span>{n.name}</span></Dropdown>} key={n.id}>
                        {n.children.map((c, i) =>
                            <TreeNode selectable={false} title={c} key={n.id + "_" + i} />
                        )}
                    </TreeNode>
                )}
            </Tree>
        )
    }
}

export default RedisConnectionTree