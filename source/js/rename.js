const fs = require('fs');
const path = require('path');

function renameImages(directory) {
    // 读取目录下的所有文件
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        // 遍历所有文件
        files.forEach((file, index) => {
            // 获取文件的完整路径
            const oldPath = path.join(directory, file);

            // 判断是否为文件夹，如果是则递归调用该方法
            fs.stat(oldPath, (err, stats) => {
                if (err) {
                    console.error(`Error stating file ${file}:`, err);
                    return;
                }

                if (stats.isDirectory()) {
                    renameImages(oldPath);
                    return;
                }

                // 生成新的文件名
                const extension = path.extname(file); // 获取文件扩展名
                const newFileName = `${index + 1}${extension}`; // 修改为你想要的命名格式

                // 构建新的文件路径
                const newPath = path.join(directory, newFileName);

                // 重命名文件
                fs.rename(oldPath, newPath, err => {
                    if (err) {
                        console.error(`Error renaming file ${file}:`, err);
                    } else {
                        console.log(`Renamed file ${file} to ${newFileName}`);
                    }
                });
            });
        });
    });
}

// 调用方法，传入图片所在的目录路径
renameImages('./img');
