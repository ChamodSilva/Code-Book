const pool = require('../config/db');

// Get all posts
exports.getAllPosts = async (req, res) =>
{
    let connection;
    try
    {
        connection = await pool.getConnection();
        const [rows] = await connection.execute
        (`
            SELECT
                p.id AS postID,
                p.title,
                p.code_snippet,
                p.language,
                p.description,
                p.github_repo_url,
                p.created_at,
                u.id AS userID,
                u.username,
                u.email
            FROM
                posts p
            JOIN
                users u ON p.user_id = u.id
            ORDER BY p.created_at DESC
        `);
        res.json(rows);
    }
    catch (err)
    {
        console.error('Error fetching posts:', err);
        res.status(500).json({ message: 'Error fetching posts', error: err.message });
    }
    finally
    {
        if (connection) connection.release();
    }
};

// Get single post by ID with comments and reactions
exports.getPostById = async (req, res) =>
{
    let connection;
    try
    {
        const postId = req.params.id;

        connection = await pool.getConnection();

        const [postRows] = await connection.execute
        (
            `SELECT
                p.postID,
                p.title,
                p.content,
                p.Image,
                p.dateCreated,
                u.userID AS authorID,
                u.firstName AS authorFirstName,
                u.lastName AS authorLastName,
                u.email AS authorEmail
            FROM
                Post p
            JOIN
                Users u ON p.userID = u.userID
            WHERE
                p.postID = ?`,
            [postId]
        );

        if (postRows.length === 0)
        {
            return res.status(404).json({ message: 'Post not found.' });
        }

        const post = postRows[0];

        const [commentRows] = await connection.execute
        (
            `SELECT
                c.commentID,
                c.comment,
                c.dateCreated,
                u.userID AS commenterID,
                u.firstName AS commenterFirstName,
                u.lastName AS commenterLastName
            FROM
                Comments c
            JOIN
                Users u ON c.userID = u.userID
            WHERE
                c.postID = ?
            ORDER BY c.dateCreated ASC`,
            [postId]
        );
        post.comments = commentRows;

        const [reactRows] = await connection.execute
        (
            `SELECT
                r.reactID,
                r.react,
                u.userID AS reactorID,
                u.firstName AS reactorFirstName,
                u.lastName AS reactorLastName
            FROM
                React r
            JOIN
                Users u ON r.userID = u.userID
            WHERE
                r.entityID = ? AND r.entityType = 'post'`,
            [postId]
        );
        post.reactions = reactRows;

        res.json(post);

    }
    catch (err)
    {
        console.error('Error fetching post details:', err);
        res.status(500).json({ message: 'Error fetching post details', error: err.message });
    }
    finally
    {
        if (connection) connection.release();
    }
};

// Create a new post
exports.createPost = async (req, res) =>
{
    let connection;
    try
    {
        const { user_id, title, code_snippet, language, description, github_repo_url } = req.body;

        if (!user_id || !title || !code_snippet)
        {
            return res.status(400).json({ message: 'user_id, title, and code_snippet are required.' });
        }

        connection = await pool.getConnection();
        const [userCheck] = await connection.execute('SELECT id FROM users WHERE id = ?', [user_id]);
        if (userCheck.length === 0)
        {
            return res.status(404).json({ message: 'Author (user_id) not found.' });
        }

        const [result] = await connection.execute
        (
            'INSERT INTO posts (user_id, title, code_snippet, language, description, github_repo_url) VALUES (?, ?, ?, ?, ?, ?)',
            [user_id, title, code_snippet, language, description, github_repo_url]
        );

        res.status(201).json
        ({
            message: 'Post created successfully',
            postID: result.insertId,
            post: { user_id, title, code_snippet, language, description, github_repo_url }
        });

    }
    catch (err)
    {
        console.error('Error creating post:', err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.code === 'ER_NO_REFERENCED_ROW')
        {
            return res.status(400).json({ message: 'Invalid user_id provided. User does not exist.', error: err.message });
        }
        res.status(500).json({ message: 'Error creating post', error: err.message });
    }
    finally
    {
        if (connection) connection.release();
    }
};

// Update a post by ID
exports.updatePost = async (req, res) =>
{
    let connection;
    try
    {
        const postId = req.params.id;
        const { title, content, Image } = req.body;

        if (!title && !content && !Image)
        {
            return res.status(400).json({ message: 'At least one field (title, content, or Image) must be provided for update.' });
        }

        connection = await pool.getConnection();

        const updateFields = [];
        const updateValues = [];
        if (title !== undefined) { updateFields.push('title = ?'); updateValues.push(title); }
        if (content !== undefined) { updateFields.push('content = ?'); updateValues.push(content); }
        if (Image !== undefined) { updateFields.push('Image = ?'); updateValues.push(Image); }

        if (updateFields.length === 0)
        {
            return res.status(400).json({ message: 'No valid fields provided for update.' });
        }

        const query = `UPDATE Post SET ${updateFields.join(', ')} WHERE postID = ?`;
        updateValues.push(postId);

        const [result] = await connection.execute(query, updateValues);

        if (result.affectedRows === 0)
        {
            return res.status(404).json({ message: 'Post not found or no changes were made.' });
        }

        res.json({ message: 'Post updated successfully' });

    }
    catch (err)
    {
        console.error('Error updating post:', err);
        res.status(500).json({ message: 'Error updating post', error: err.message });
    }
    finally 
    {
        if (connection) connection.release();
    }
};

// Delete a post by ID
exports.deletePost = async (req, res) =>
{
    let connection;
    try
    {
        const postId = req.params.id;

        connection = await pool.getConnection();

        const [result] = await connection.execute
        (
            'DELETE FROM Post WHERE postID = ?',
            [postId]
        );

        if (result.affectedRows === 0)
        {
            return res.status(404).json({ message: 'Post not found.' });
        }

        res.status(200).json({ message: 'Post deleted successfully.' });

    }
    catch (err)
    {
        console.error('Error deleting post:', err);
        res.status(500).json({ message: 'Error deleting post', error: err.message });
    }
    finally
    {
        if (connection) connection.release();
    }
};