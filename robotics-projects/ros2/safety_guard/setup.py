from setuptools import setup

package_name = 'safety_guard'
setup(
    name=package_name,
    version='0.1.0',
    packages=[package_name],
    data_files=[
        ('share/ament_index/resource_index/packages', ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml', 'README.md']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='Cavwic',
    maintainer_email='chen_career@sina.com',
    description='Educational interlock; not a hardware emergency stop or safety certification.',
    license='Apache-2.0',
    tests_require=['pytest'],
    entry_points={'console_scripts': [
        'guard = safety_guard.node:main',
        'mock_joint = safety_guard.mock_joint:main',
    ]},
)
